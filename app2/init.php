<?php
	require "vendor\autoload.php";

	use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain' => 'hanhnvbkhnsso1.auth0.com',
  'client_id' => 'gUsa4n1linB7cUqzduuAi91TJA1xR7Wh',
  'client_secret' => 'iRb8rO9Zp-MM_mlkzyyElBjJCKbr-LnC9CRmlnBYtrr5ojOE2LEnh9hOpjTbqezY',
  'redirect_uri' => 'https://localhost/app2/callback.php',
  'audience' => 'https://hanhnvbkhnsso1.auth0.com/userinfo',
  'persist_id_token' => true,
  'persist_access_token' => true,
  'persist_refresh_token' => true,
]);
?>