<?php

declare(strict_types=1);

use App\Application\Actions\User\ListUsersAction;
use App\Application\Actions\User\ViewUserAction;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;
use Slim\Interfaces\RouteCollectorProxyInterface as Group;

return function (App $app) {
    $app->options('/{routes:.*}', function (Request $request, Response $response) {
        // CORS Pre-Flight OPTIONS Request Handler
        return $response;
    });

    $app->get('/', function (Request $request, Response $response) {
        $response->getBody()->write('Hello world!');
        return $response;
    });

    $app->post('/search', function (Request $request, Response $response): Response {
        $response = $response->withHeader('Content-Type', 'application/json');

        // Set the URL for the API endpoint

        // Get the registration number from the request body
        $registration = $request->getParsedBody()['registration'];

        $url = 'https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=' . $registration;


        // Set the headers as an associative array
        $headers = array(
            'x-api-key: xxxxxxx-xxxxxxx-xxxxxxxx-xxxxxxxx',
            'Content-Type: application/json',
        );

        // Initialize cURL
        $ch = curl_init();

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute the cURL request
        $result = curl_exec($ch);

        // Close cURL
        curl_close($ch);



        $url2 = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles/';


        // Set the POST data as an associative array
        $data = array(
            'registrationNumber' => $registration
        );

        $headers = array(
            'x-api-key: xxxxxx-xxxxx-xxxxxx-xxxxxx-xxxxxx',
            'Content-Type: application/json'
        );
    
        // Initialize cURL
        $ch2 = curl_init();
    
        // Set the cURL options
        curl_setopt($ch2, CURLOPT_URL, $url2);
        curl_setopt($ch2, CURLOPT_POST, true);
        curl_setopt($ch2, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch2, CURLOPT_HTTPHEADER, $headers);
    
        // Execute the cURL request
        $result2 = curl_exec($ch2);
    
        // Close cURL
        curl_close($ch2);

        $tax = json_decode($result2, true);
        $mot = json_decode($result, true);
   

        if(isset($mot) && isset($mot['httpStatus']) && $mot['httpStatus'] === '404' && isset($tax) && isset($tax['errors']) && !empty($tax['errors'])) {
            $response->getBody()->write(json_encode([
                'error' => 'No data found.'
            ]));

            return $response;
        }

        $data = [
            'MOT' => $result,
            'TAX' => $result2
        ];


        // Output the result
        $response->getBody()->write(json_encode($data));

        return $response;
    });



    $app->group('/users', function (Group $group) {
        $group->get('', ListUsersAction::class);
        $group->get('/{id}', ViewUserAction::class);
    });
};