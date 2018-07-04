# Andela Eats
The Andela Eats client side implementation

# Description
The Andela Eats is the software automation of the current feeding system so as to make it scalable through enabling access to all Andelans without Andela having to incur extra cost. The solution will also serve as a central place where all meal information is stored both for andelans and vendors. Vendors can manage meals and view feedback. Andelans can conveniently pre-order meals without the fear that a particular favourite meal is finished. 


## Setup
### Dependencies
+ React
+ Node
+ NPM

### Getting Started
Here is how to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
Software you need to install and how to install:

* You will need to have npm, the best way to install npm is to install node using the [node.js installer](https://nodejs.org/en/download/), npm is installed as part of node.

### Installing
Series of steps needed to get a development env running.

* First, you need to clone the git repository  
  `git clone https://github.com/andela/AndelaEatsUI.git`

* After successfully cloning the project:

  `cd AndelaEatsUI/app`

* You will require to create an alias for andelaeats-dev.andela.com in your /etc/hosts which you can access by running this command
  ```sudo vim /etc/hosts``` which opens your /etc/hosts for editing using vim.
  To edit it, get into insert mode by pressing ```i``` key and put these
   ```127.0.0.1       andelaeats-dev.andela.com``` after the last line.

* Be sure to rename `.env-sample` to `.env` and change the `NODE_ENV` and other environment variables appropriately. Starting the application for development and building for project is dependent on the `NODE_ENV` variable specified in the `.env` file.

* Install all dependecies.
  `npm install`


## Running the tests
This is how you will run the tests for the system:  
  `npm test`

## Contributions

* Contributors should adhere to the guidelines in the:
* [Andela Eats](https://github.com/andela/AndelaEatsUI/wiki/AndelaEats-Conventions)
