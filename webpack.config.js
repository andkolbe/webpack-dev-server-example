const path = require('path');
var nodeExternals = require('webpack-node-externals');

const serverConfig = {
    name: 'server',
    mode: process.env.NODE_ENV || 'development',
    entry: './src/server/server.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: 'tsconfig.server.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist')
    },
    target: 'node',
    node: {
        __dirname: false
    },
    externals: [nodeExternals()]
};

const clientConfig = {
    name: 'client',
    mode: process.env.NODE_ENV || 'development',
    entry: './src/client/index.tsx',
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
            options: {
                configFile: 'tsconfig.client.json'
            }
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }
      ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css', '.scss']
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'public/js')
    },
    // dev server shit
    devServer: {
        port: 3000, // our react code will continue to run on 3000
        publicPath: '/js/', // webpack compiles and runs the react code out of public/js
        contentBase: path.join(__dirname, '/public'), // contentBase: where the root of our folder is found. our index.html where our outputted js code has to go to
        open: true, // opens chrome automatically and navigates to the given path
        inline: true, // opens a new tab in your existing window instead of opening a new window entirely 
        hot: true, // when it outputs a new app.js file, it will trigger a refresh automatically in the same browser window
        historyApiFallback: true, // in case of 404, send our index.html page back so react-router-dom can kick on and keep doing its job. replaces app.get('*') in our server code
        proxy: {
            '/api': 'http://localhost:8080' // when we write /api in our fetch requests, we want it to default to this. Makes it so we don't have to change our routes in our components
        }
    }
};

module.exports = [serverConfig, clientConfig];