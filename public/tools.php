<?php
/**
 * FormulaCalcKit 泛域名与子目录自动扫描服务
 * 文件名：tools.php (支持放置在网站根目录或子目录中)
 */

// 1. 设置跨域与 JSON 输出格式（允许主站前端任意跨域请求）
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// 2. 根域名设置（默认 formulacalckit.com）
$rootDomain = 'formulacalckit.com';

// 3. 扫描目录自适应：
// 优先扫描当前目录；如果需要扫描同级目录或父级目录，支持传参或默认回退
$sitesDir = __DIR__;
if (isset($_GET['dir']) && !empty($_GET['dir'])) {
    $customDir = realpath($_GET['dir']);
    if ($customDir && is_dir($customDir)) {
        $sitesDir = $customDir;
    }
} elseif (isset($_GET['parent']) && $_GET['parent'] === '1') {
    $sitesDir = dirname(__DIR__);
}

// 排除系统目录、静态与非项目文件夹
$ignoreDirs = ['.', '..', '.git', '.aistudio', 'node_modules', 'vendor', 'assets', 'api', 'static', 'css', 'js', '.well-known'];

// 辅助函数：健壮提取 <meta> 标签内容（解决单双引号嵌套与属性先后顺序问题）
function extractMetaTag($html, $name) {
    // 形式 1: name="..." content="..."
    if (preg_match('/<meta\s+[^>]*name=["\']' . preg_quote($name, '/') . '["\'][^>]*content=(["\'])(.*?)\1/is', $html, $m)) {
        return trim(html_entity_decode($m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
    // 形式 2: content="..." name="..."
    if (preg_match('/<meta\s+[^>]*content=(["\'])(.*?)\1[^>]*name=["\']' . preg_quote($name, '/') . '["\']/is', $html, $m)) {
        return trim(html_entity_decode($m[2], ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }
    return '';
}

$tools = [];

if (is_dir($sitesDir)) {
    $dirItems = scandir($sitesDir);

    foreach ($dirItems as $item) {
        if (in_array($item, $ignoreDirs) || str_starts_with($item, '.')) {
            continue;
        }

        $fullPath = $sitesDir . '/' . $item;

        if (is_dir($fullPath)) {
            // 支持寻找项目入口（根目录 index.html/php 或 dist/index.html）
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

            // 自动剥离 GitHub 压缩包自带的 -main, -master, -release 后缀
            $cleanSub = preg_replace('/[-_](main|master|release)$/i', '', $item);

            // 读取前 16384 字节（覆盖完整的 <head> 区域）
            $html = file_get_contents($entryFile, false, null, 0, 16384);

            // 1. 提取 <title> 并解码 HTML 实体
            $title = $cleanSub;
            if (preg_match('/<title[^>]*>(.*?)<\/title>/is', $html, $matches)) {
                $title = trim(html_entity_decode(strip_tags($matches[1]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
            }

            // 2. 提取 <meta name="description">
            $desc = extractMetaTag($html, 'description');

            // 3. 提取自定义公式标签
            $formula = extractMetaTag($html, 'tool-formula');

            // 4. 提取自定义分类
            $category = extractMetaTag($html, 'tool-category');

            // 5. 提取自定义图标
            $icon = extractMetaTag($html, 'tool-icon');

            // 智能补全分类与图标（如果未显式提供 meta）
            $combinedText = strtolower($cleanSub . ' ' . $title . ' ' . $desc);
            if (empty($category)) {
                if (preg_match('/(rest|stop|highway|nav|road|traffic|路线|导航|服务区|公路|休息)/i', $combinedText)) {
                    $category = '路线与便民导航';
                } elseif (preg_match('/(math|calc|formula|geometry|algebra|物理|数学|几何|代数|计算)/i', $combinedText)) {
                    $category = '科学与在线计算';
                } else {
                    $category = '在线实用工具';
                }
            }
            if (empty($icon)) {
                if (preg_match('/(rest|stop|highway|nav|road|traffic|路线|导航|服务区|公路|休息)/i', $combinedText)) {
                    $icon = '🚗';
                } elseif (preg_match('/(math|calc|formula|物理|数学|计算)/i', $combinedText)) {
                    $icon = '🧮';
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

// 4. 返回标准 JSON
echo json_encode([
    'success' => true,
    'count'   => count($tools),
    'tools'   => $tools,
    'time'    => date('Y-m-d H:i:s'),
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
