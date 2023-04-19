<?php

require_once "router.php";
require_once "contact.php";

$routes = [];

function render_base($head = false, $body)
{
	require 'head.php';
	$base = render_head($head, 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
	$base .= file_get_contents('navbar.html');

	$base .= $body;

	if ($head !== 'home') {
		$base .= file_get_contents('footer.html');
	}
	return $base;
}

function send_message()
{
	$message = new Message($_POST);
	var_dump($message->handle_post());
}

route('/', function () {
	return render_base('home', file_get_contents('home.html'));
});

route('que-hacemos', function () {
	return render_base('que_hacemos', file_get_contents('quehacemos.html'));
});

route('quienes-somos', function () {
	return render_base('quienes_somos', file_get_contents('quienessomos.html'));
});

route('contacto', function () {
	return render_base('contacto', file_get_contents('contact.html'));
});

route('trabaja-con-nosotros', function () {
	return render_base('contacto', file_get_contents('trabajaconnosotros.html'));
});

route('politica-de-cookies', function () {
	return render_base('cookies', file_get_contents('cookies.html'));
});

route('casos', function () {
	return render_base('casos', file_get_contents('caso.html'));
});

route('servicio', function () {
	return render_base('servicio', file_get_contents('servicio.html'));
});

route('blog', function () {
	return render_base('blog', file_get_contents('blog-home.html'));
});

route('send_message', function () {
	return send_message();
});

route('robots.txt', function () {
	$data = json_decode(file_get_contents('https://admin.d2b.cl/d2badmin/items/robotstxt/1'));
	header('Content-Type: text/plain');
	return $data->data->content;
});

route('sitemap.xml', function () {

	$base_url = (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'];

	$sitemap_content = '
		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		   <url>
		      <loc>' . $base_url . '</loc>
		      <priority>0.8</priority>
		   </url>
		   <url>
		      <loc>' . $base_url . '/que-hacemos</loc>
		      <priority>0.8</priority>
		   </url>
		   <url>
		      <loc>' . $base_url . '/quienes-somos</loc>
		      <priority>0.8</priority>
		   </url>
		   <url>
		      <loc>' . $base_url . '/contacto</loc>
		      <priority>0.8</priority>
		   </url>
		   <url>
		      <loc>' . $base_url . '/trabaja-con-nosotros</loc>
		      <priority>0.8</priority>
		   </url>
		   <url>
		      <loc>' . $base_url . '/blog</loc>
		      <priority>0.8</priority>
		   </url>
	';

	$blog_categories = json_decode(file_get_contents('https://admin.d2b.cl/d2badmin/items/category'));
	foreach ($blog_categories->data as $category) {
		$sitemap_content .= '
			<url>
			   <loc>' . $base_url . '/blog/' . $category->url_segment . '</loc>
			   <priority>0.8</priority>
			</url>
		';
	}
	$blog_articles = json_decode(file_get_contents('https://admin.d2b.cl/d2badmin/items/blog'));
	foreach ($blog_articles->data as $article) {
		$sitemap_content .= '
			<url>
			   <loc>' . $base_url . '/blog/' . $article->url_segment . '</loc>
			   <priority>0.8</priority>
			</url>
		';
	}
	$casos = json_decode(file_get_contents('https://admin.d2b.cl/d2badmin/items/caso'));
	foreach ($casos->data as $caso) {
		$sitemap_content .= '
			<url>
			   <loc>' . $base_url . '/casos/' . $caso->url_segment . '</loc>
			   <priority>0.8</priority>
			</url>
		';
	}
	$servicios = json_decode(file_get_contents('https://admin.d2b.cl/d2badmin/items/dev_expertise'));
	foreach ($servicios->data as $servicio) {
		$sitemap_content .= '
			<url>
			   <loc>' . $base_url . '/servicio/' . $servicio->url_segment . '</loc>
			   <priority>0.8</priority>
			</url>
		';
	}
	$sitemap_content .= '</urlset>';
	header('Content-Type: text/xml');
	return $sitemap_content;
});

$action = $_SERVER['REQUEST_URI'];

dispatch($action);
