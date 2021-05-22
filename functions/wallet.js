//var config = require('../config.js');
try{
    var config = process.cwd()+'/config.js';
    config = require(config);
}catch (error){
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

var log = require('./log.js');

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

// A node.js library for communicating with Bitcoin daemon. -> https://www.npmjs.com/package/altcoin-rpc
const Client = require('altcoin-rpc');
const dogecClient = new Client({ host: config.wallet.dogec.server, username: config.wallet.dogec.user, password: config.wallet.dogec.password, port: config.wallet.dogec.port });
const znzClient = new Client({ host: config.wallet.znz.server, username: config.wallet.znz.user, password: config.wallet.znz.password, port: config.wallet.znz.port });

const Big = require('big.js'); // https://github.com/MikeMcl/big.js -> http://mikemcl.github.io/big.js/

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //DOGECASH

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    /* ------------------------------------------------------------------------------ */
    // Create deposit address for user id
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_create_deposit_address: function(){
        return new Promise((resolve, reject)=>{
            dogecClient.getNewAddress(function(error, result) {
                if(error){
                    var errorMessage = "wallet_create_deposit_address: Wallet query problem. (getnewaddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get latest deposits from wallet
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_get_latest_deposits: function(){
        return new Promise((resolve, reject)=>{
            dogecClient.listTransactions('*', config.wallet.depositsToCheck, function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_latest_deposits: Wallet query problem. (listTransactions)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Check if payout address is valid
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_validate_address: function(address){
        return new Promise((resolve, reject)=>{
            dogecClient.validateAddress(address, function(error, result) {
                if(error){
                    var errorMessage = "wallet_validate_address: Wallet query problem. (validateAddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve('error');
                }else{
                    resolve(result.isvalid);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Do withdrawal to address
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_send_to_address: function(address,amount){
        return new Promise((resolve, reject)=>{
            dogecClient.sendToAddress(address,amount, function(error, result) {
                if(error){
                    var errorMessage = "wallet_send_to_address: Wallet query problem. (sendToAddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get transaction
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_get_transaction: function(txid){
        return new Promise((resolve, reject)=>{
            dogecClient.getTransaction(txid, function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_transaction: Wallet query problem. (getTransaction)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get balance
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_get_balance: function(){
        return new Promise((resolve, reject)=>{
            dogecClient.getBalance('*',function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_balance: Wallet query problem. (getTransaction)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get wallet info
    /* ------------------------------------------------------------------------------ */

    dogec_wallet_get_info: function(){
        return new Promise((resolve, reject)=>{
            dogecClient.getInfo(function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_info: Wallet query problem. (getInfo)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve('error');
                }else{
                    resolve(result);
                }   
            });
        });
    }
    
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //ZENZO

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    
    
    
    /* ------------------------------------------------------------------------------ */
    // Create deposit address for user id
    /* ------------------------------------------------------------------------------ */

    znz_wallet_create_deposit_address: function(){
        return new Promise((resolve, reject)=>{
            znzClient.getNewAddress(function(error, result) {
                if(error){
                    var errorMessage = "wallet_create_deposit_address: Wallet query problem. (getnewaddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get latest deposits from wallet
    /* ------------------------------------------------------------------------------ */

    znz_wallet_get_latest_deposits: function(){
        return new Promise((resolve, reject)=>{
            znzClient.listTransactions('*', config.wallet.depositsToCheck, function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_latest_deposits: Wallet query problem. (listTransactions)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Check if payout address is valid
    /* ------------------------------------------------------------------------------ */

    znz_wallet_validate_address: function(address){
        return new Promise((resolve, reject)=>{
            znzClient.validateAddress(address, function(error, result) {
                if(error){
                    var errorMessage = "wallet_validate_address: Wallet query problem. (validateAddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve('error');
                }else{
                    resolve(result.isvalid);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Do withdrawal to address
    /* ------------------------------------------------------------------------------ */

    znz_wallet_send_to_address: function(address,amount){
        return new Promise((resolve, reject)=>{
            znzClient.sendToAddress(address,amount, function(error, result) {
                if(error){
                    var errorMessage = "wallet_send_to_address: Wallet query problem. (sendToAddress)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get transaction
    /* ------------------------------------------------------------------------------ */

    znz_wallet_get_transaction: function(txid){
        return new Promise((resolve, reject)=>{
            znzClient.getTransaction(txid, function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_transaction: Wallet query problem. (getTransaction)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get balance
    /* ------------------------------------------------------------------------------ */

    znz_wallet_get_balance: function(){
        return new Promise((resolve, reject)=>{
            znzClient.getBalance('*',function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_balance: Wallet query problem. (getTransaction)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    resolve(result);
                }   
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get wallet info
    /* ------------------------------------------------------------------------------ */

    znz_wallet_get_info: function(){
        return new Promise((resolve, reject)=>{
            znzClient.getInfo(function(error, result) {
                if(error){
                    var errorMessage = "wallet_get_info: Wallet query problem. (getInfo)";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve('error');
                }else{
                    resolve(result);
                }   
            });
        });
    }
    
    
    
    
    
    

};
