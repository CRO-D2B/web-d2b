<?php

/**
 * Holds the registered routes
 *
 * @var array $routes
 */

$routes = [];

/**
 * Register a new route
 *
 * @param $action string
 * @param \Closure $callback Called when current URL matches provided action
 */

function route($action, Closure $callback)
{
    global $routes;
    $action = trim($action, '/');
    $routes[$action] = $callback;
}

/**
 * Dispatch the router
 *
 * @param $action string
 */

function dispatch($action)
{
    global $routes;

    $action = trim($action, '/');

    if (isset($routes[$action])) {
        $callback = $routes[$action];
    } else if (preg_match('/blog\/.*/', $action)) {
        $callback = $routes['blog'];
    } else if (preg_match('/casos\/.*/', $action)) {
        $callback = $routes['casos'];
    } else if (preg_match('/servicio\/.*/', $action)) {
        $callback = $routes['servicio'];
    } else if (preg_match('/login\/.*/', $action)) {
        $callback = $routes['login'];
    } else {
        $callback = $routes['list_category'];
    }

    echo call_user_func($callback);
}
