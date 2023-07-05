# GoShop API

This is the API for GoShop project, which
uses `PhpStorm 2023.2 EAP`, `PHP 8.2`, `Symfony's HttpFoundation`, `RedBeanPHP ORM`, and `MySQL` for database.

## Getting Started

These instructions will guide you on how to set up and run the GoShop API project on your local machine for development
purposes.

### Prerequisites

Make sure you have the following installed on your system:

1. PHP 8.2 or greater
2. Composer (installed globally or as `composer.phar` in your project directory)
3. MySQL

### Installing

1. Clone the repository to your local machine:

    ```
    git clone git@github.com:username/goshop.git
    ```

   Replace `username` with your actual GitHub username and `goshop` with the actual repository name.

2. Navigate into the project directory:

    ```
    cd GoShop/api
    ```

3. If you have `composer` installed globally, run:

    ```
    composer install
    ```

   If you have `composer.phar` file in your project directory, run:

    ```
    php composer.phar install
    ```

   This will install all the dependencies defined in the `composer.json` file of the project.

### Running the Project

After successfully installing the project and its dependencies, you are now ready to run the project. Use your preferred
PHP development server or configure a virtual host on your web server pointing to the project's public directory.

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License. See the `LICENSE.md` file for details.
