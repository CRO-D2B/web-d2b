<?php

function render_head($head, $link_canonical){

if ($head == 'blog' || $head == 'login') {
    $body_classes = 'bg-grey-lighter';
} else {
    $body_classes = '';
}

if ($head == 'home') {
    $logo = '';
}else if ($head == 'casos' || $head == 'servicio' || $head == 'blog') {
    $logo = "<div class='container header-container header-normal initial'>
                <div class='header-content'>
                    <div class='header-logo-container'>
                        <a href='/'><img src='/static/img/logos/D2B-COLOR-CON BAJADA-01.png' alt=''></a>
                    </div>
                    <div class='header-menu-container'>
                        <p class='color-grey'>MENÚ</p>
                        <div class='header-button-container'>
                            <div class='button-item bg-grey'></div>
                            <div class='button-item bg-grey'></div>
                            <div class='button-item bg-grey'></div>
                        </div>
                    </div>
                </div>
            </div>";
}else{
    $logo = "<div class='container header-container header-normal initial'>
                <div class='header-content'>
                    <div class='header-logo-container'>
                        <a href='/'><img src='/static/img/logos/D2B-BLANCO-CON BAJADA-02.png' alt=''></a>
                    </div>
                    <div class='header-menu-container'>
                        <p>MENÚ</p>
                        <div class='header-button-container'>
                            <div class='button-item'></div>
                            <div class='button-item'></div>
                            <div class='button-item'></div>
                        </div>
                    </div>
                </div>
            </div>";
}

return "
    <!DOCTYPE html>
    <html>

    <head>
    	<meta charset='utf-8'>
    	<meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <link rel='preconnect' href='https://fonts.googleapis.com'>
        <link rel='preconnect' href='https://fonts.gstatic.com'>
        <link rel='preconnect' href='https://admin.d2b.cl'>
        <link rel='preconnect' href='https://www.googletagmanager.com'>
        <link rel='preconnect' href='https://www.google-analytics.com'>
        
        <link rel='icon' href='./favicon-d2b.png'>
        
        <link rel='canonical' href='". $link_canonical ."'>

        <style>
            " . file_get_contents("static/css/".$head.".css") . " 
        </style>

    	<link
            href='https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Open+Sans:wght@400;700;800&display=swap'
    		rel='stylesheet'>

            <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K66TPW5');</script>
            <!-- End Google Tag Manager -->

    </head>

    <body class=".$body_classes.">

        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src='https://www.googletagmanager.com/ns.html?id=GTM-K66TPW5'
        height='0' width='0' style='display:none;visibility:hidden'></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->

    	<!-- HEADER START -->
    	<header>
            ".$logo."
            <div class='container animate header-container header-scroll'>
                <div class='header-content'>
                    <div class='header-logo-container'>
                        <a href='/'><img src='/static/img/logos/D2B-BLANCO.png' alt=''></a>
                    </div>
                    <div class='header-menu-container'>
                        <p>MENÚ</p>
                        <div class='header-button-container'>
                            <div class='button-item'></div>
                            <div class='button-item'></div>
                            <div class='button-item'></div>
                        </div>
                    </div>
                </div>
            </div>
    	</header>";
}