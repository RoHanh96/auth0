<?php
	require "vendor\autoload.php";

	use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => 'hanhnvbkhnsso1.auth0.com',
  'client_id' => 'ALXSbFEqy8ZnRh9MHEiTuXsOShC7sj4j',
  'client_secret' => '48WPBE0MvcF8qUPc1z4-yw5UuzFrz5NzmbFBY_H_gVlzNXRfOq6O5Y2ebcvtjeSq',
  'redirect_uri' => 'https://localhost/app1/callback.php',
  'audience' => 'https://hanhnvbkhnsso1.auth0.com/userinfo',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);
?>