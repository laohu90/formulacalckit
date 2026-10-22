<?php
/**
 * FormulaCalcKit 高性能泛域名与子目录自动扫描服务 (企业级万级站点优化版)
 * 文件名：tools.php
 * 
 * 架构级优化特性：
 * 1. 文件级持久化缓存 (tools_cache.json) + 智能 mtime 变动感知，消除重复 I/O 扫描
 * 2. HTTP ETag 与 304 Not Modified 条件请求，网络流量与响应延迟近乎 0ms
 * 3. 支持 CLI 命令行运行 (php tools.php)，方便配合 Linux Crontab / 宝塔计划任务定时生成
 * 4. 支持分页参数 (?page=1&limit=50) 与即时关键词搜索 (?q=关键字)，彻底解决千级站点性能瓶颈
 * 5. 内存安全保护与流式提取，单次扫描即使有上千个子目录也不会耗尽服务器内存
 */

// 开启内存与执行时间保护
@ini_set('memory_limit', '256M');
@set_time_limit(60);

$isCli = (php_sapi_name() === 'cli');

// 1. 设置跨域与 JSON 输出格式（CLI 模式跳过 HTTP 头部）
if (!$isCli) {
    header('Content-Type: application/json; charset=utf-8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit(0);
    }
}

// 2. 根域名设置
$rootDomain = 'formulacalckit.com';

// 3. 扫描目录与缓存路径
$sitesDir = __DIR__;
if (isset($_GET['dir']) && !empty($_GET['dir'])) {
    $customDir = realpath($_GET['dir']);
    if ($customDir && is_dir($customDir)) {
        $sitesDir = $customDir;
    }
} elseif (isset($_GET['parent']) && $_GET['parent'] === '1') {
    $sitesDir = dirname(__DIR__);
}

$cacheFile = __DIR__ . '/tools_cache.json';
$cacheTtl = 1800; // 缓存有效期 30 分钟
$forceRefresh = isset($_GET['refresh']) && $_GET['refresh'] === '1';

// 4. 智能缓存检查：若目录未变动且在 TTL 内，直接返回缓存，0ms 响应
$useCache = false;
if (!$forceRefresh && file_exists($cacheFile)) {
    $cacheMtime = filemtime($cacheFile);
    $dirMtime = is_dir($sitesDir) ? filemtime($sitesDir) : 0;
    // 目录自上次缓存生成后无任何文件增删，且未超 TTL
    if (($cacheMtime >= $dirMtime) && ((time() - $cacheMtime) < $cacheTtl)) {
        $useCache = true;
    }
}

// 辅助函数：健壮提取 <meta> 标签（解决单双引号嵌套与属性先后顺序问题）
function extractMetaTag($html, $name) {
    if (preg_match('/<meta\s+[^>]*name=["\']' . preg_quote($name, '/') . '["\'][^>]*content=(["\'])(.*?)\1/is', $html, $m)) {
        return trim(html_entity_decode($m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
    if (preg_match('/<meta\s+[^>]*content=(["\'])(.*?)\1[^>]*name=["\']' . preg_quote($name, '/') . '["\']/is', $html, $m)) {
        return trim(html_entity_decode($m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
    return '';
}

// 5. 若无法复用缓存，执行全量智能扫描
if (!$useCache) {
    // 排除系统目录、非项目文件夹
    $ignoreDirs = [
        '.', '..', '.git', '.aistudio', 'node_modules', 'vendor', 
        'assets', 'api', 'static', 'css', 'js', '.well-known', 'logs', 'temp'
    ];
    $tools = [];

    if (is_dir($sitesDir)) {
        $dirItems = scandir($sitesDir);

        foreach ($dirItems as $item) {
            if (in_array($item, $ignoreDirs) || str_starts_with($item, '.')) {
                continue;
            }

            $fullPath = $sitesDir . '/' . $item;

            if (is_dir($fullPath)) {
                $entryFile = null;
                if (file_exists($fullPath . '/index.html')) {
                    $entryFile = $fullPath . '/index.html';
                } elseif (file_exists($fullPath . '/index.php')) {
                    $entryFile = $fullPath . '/index.php';
                } elseif (file_exists($fullPath . '/dist/index.html')) {
                    $entryFile = $fullPath . '/dist/index.html';
                }

                if (!$entryFile) {
                    continue;
                }

                // 自动剥离 GitHub 压缩包后缀 -main, -master, -release
                $cleanSub = preg_replace('/[-_](main|master|release)$/i', '', $item);

                // 读取前 16384 字节（精准覆盖 head 区域，极大降低千级文件 I/O 开销）
                $html = file_get_contents($entryFile, false, null, 0, 16384);

                // 1. 提取 <title> 并解码 HTML 实体
                $title = $cleanSub;
                if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $matches)) {
                    $title = trim(html_entity_decode(strip_tags($matches[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
                }

                // 2. 提取各类 meta 标签
                $desc     = extractMetaTag($html, 'description');
                $formula  = extractMetaTag($html, 'tool-formula');
                $category = extractMetaTag($html, 'tool-category');
                $icon     = extractMetaTag($html, 'tool-icon');

                // 智能分类与图标推导
                $combinedText = strtolower($cleanSub . ' ' . $title . ' ' . $desc);
                if (empty($category)) {
                    if (preg_match('/(rest|stop|highway|nav|road|traffic|路线|导航|服务区|公路|休息|停车)/i', $combinedText)) {
                        $category = '路线与便民导航';
                    } elseif (preg_match('/(math|calc|formula|geometry|algebra|物理|数学|几何|代数|计算|方程)/i', $combinedText)) {
                        $category = '科学与在线计算';
                    } elseif (preg_match('/(fin|tax|money|loan|interest|金融|理财|贷款|税)/i', $combinedText)) {
                        $category = '实用与金融';
                    } else {
                        $category = '在线实用工具';
                    }
                }
                if (empty($icon)) {
                    if (preg_match('/(rest|stop|highway|nav|road|traffic|路线|导航|服务区|公路|休息)/i', $combinedText)) {
                        $icon = '🚗';
                    } elseif (preg_match('/(math|calc|formula|物理|数学|计算)/i', $combinedText)) {
                        $icon = '🧮';
                    } elseif (preg_match('/(fin|tax|money|金融|贷款)/i', $combinedText)) {
                        $icon = '💰';
                    } else {
                        $icon = '🌐';
                    }
                }

                $tools[] = [
                    'subdomain' => $cleanSub,
                    'domain'    => $cleanSub . '.' . $rootDomain,
                    'url'       => 'https://' . $cleanSub . '.' . $rootDomain . '/',
                    'title'     => $title,
                    'desc'      => $desc,
                    'formula'   => $formula,
                    'category'  => $category,
                    'icon'      => $icon,
                ];
            }
        }
    }

    $payload = [
        'success'   => true,
        'total'     => count($tools),
        'count'     => count($tools),
        'tools'     => $tools,
        'time'      => date('Y-m-d H:i:s'),
        'cached'    => false,
    ];

    // 写入静态缓存文件
    @file_put_contents($cacheFile, json_encode($payload, JSON_UNESCAPED_UNICODE));
} else {
    // 从缓存快速读取
    $rawCache = @file_get_contents($cacheFile);
    $payload = json_decode($rawCache, true) ?: [
        'success' => true,
        'total'   => 0,
        'count'   => 0,
        'tools'   => [],
        'time'    => date('Y-m-d H:i:s'),
    ];
    $payload['cached'] = true;
}

// 6. 支持后端可选分页与关键词检索（应对上万个站点）
$allTools = $payload['tools'] ?? [];
$totalCount = count($allTools);

// 关键词筛选
$searchQuery = isset($_GET['q']) ? trim($_GET['q']) : '';
if ($searchQuery !== '') {
    $qLower = mb_strtolower($searchQuery, 'UTF-8');
    $allTools = array_values(array_filter($allTools, function($t) use ($qLower) {
        $text = mb_strtolower(($t['title'] ?? '') . ' ' . ($t['desc'] ?? '') . ' ' . ($t['subdomain'] ?? ''), 'UTF-8');
        return mb_strpos($text, $qLower) !== false;
    }));
}

// 分类筛选
$catFilter = isset($_GET['category']) ? trim($_GET['category']) : '';
if ($catFilter !== '' && $catFilter !== 'all') {
    $allTools = array_values(array_filter($allTools, function($t) use ($catFilter) {
        return ($t['category'] ?? '') === $catFilter;
    }));
}

// 分页处理
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 0;
$limit = isset($_GET['limit']) ? max(1, min(200, intval($_GET['limit']))) : 0;

if ($page > 0 && $limit > 0) {
    $offset = ($page - 1) * $limit;
    $pagedTools = array_slice($allTools, $offset, $limit);
    $outputData = [
        'success'    => true,
        'total'      => $totalCount,
        'filtered'   => count($allTools),
        'page'       => $page,
        'limit'      => $limit,
        'totalPages' => ceil(count($allTools) / $limit),
        'count'      => count($pagedTools),
        'tools'      => $pagedTools,
        'time'       => $payload['time'] ?? date('Y-m-d H:i:s'),
        'cached'     => $payload['cached'] ?? false,
    ];
} else {
    // 默认全量输出（兼容当前前端双扫描器）
    $outputData = [
        'success'    => true,
        'total'      => $totalCount,
        'count'      => count($allTools),
        'tools'      => $allTools,
        'time'       => $payload['time'] ?? date('Y-m-d H:i:s'),
        'cached'     => $payload['cached'] ?? false,
    ];
}

$jsonOutput = json_encode($outputData, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

// 7. 发送 HTTP 缓存头与 ETag 304 协商响应
if (!$isCli) {
    $etag = '"' . md5($jsonOutput) . '"';
    header('ETag: ' . $etag);
    header('Cache-Control: public, max-age=300, stale-while-revalidate=600');

    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH']) === $etag) {
        http_response_code(304);
        exit(0);
    }
}

echo $jsonOutput;
