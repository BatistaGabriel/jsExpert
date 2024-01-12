# Docs

## Using NVM

### Installing

To get nvm installed you can follow [these instructions](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/).

### Checking installation

Once you got nvm installed on your machine you can check if everything was installed successfully by checking the version. You can do that using the following command:

```bash

nvm --version

```

### Installing a node version

To install a node version using nvm you can do that by using the following command:

```bash

nvm install  <desired  version>

```

If you want to install the current LTS version, do that by using the following command:

```bash

nvm install  --lts

```

**\*Disclaimer**: this will set your node version to the installed via nvm.

### Listing installed

To list all the installed versions on your machine you can use the command:

```bash

nvm list

```

### Using an installed version

To use an installed node version you can do that by using the following command:

```bash

nvm use  <desired  version>

```

### Defining a default version

To have a default version for your machine we need to define an alias to do that, we can do this by using the following command:

```bash

nvm alias  default  <desired  version>

```

### Identifying versions per projects

To identify which node version is better to be used in a project, we usually have inside the project a file named _`.nvmrc`_ that will have inside of it the necessary node version to be used in the project.

The file content has the version of the node, like this:

```bash

v18.14.2

```

### Using the node version of the project

For you to use the node version that better fits into the project you are working on, just run the following command:

```bash

nvm use

```

This command will seek the _`.nvmrc`_ file and based on the informed version inside of this file, it will set the node version of your machine

### Creating a .nvmrc file

To create the _`.nvmrc`_ file for your project based on your current node version, you can do that by using the following command:

```bash

node -v  >  .nvmrc

```

^^ this is the best practice to adopt btw

---

## MISC

### Working with engines

Once you got defined the version that better fits your project on _`.nvmrc`_ file, a good thing to do after you run `npm init -y`, is to set the section `engines` corresponding to the version defined at _`.nvmrc`_ file. You can do that by creating a section like this:

```js

"engines": {

"node":  "<same version of .nvmrc file>"

}

```

This will guarantee you that while installing/restoring libs nothing will break due to the necessity that the lib must be compatible with the engine version
