//var config = require('../config.js');
try{
    var config = process.cwd()+'/config.js';
    config = require(config);
}catch (error){
    console.error('ERROR -> Unable to load config file.');
    process.exit(1);
}

var check = require("./check.js");
var log = require("./log.js");

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

// Mysql2
const mysql = require('mysql2');
// connect mysql database
mysqlPool  = mysql.createPool({
    connectionLimit : config.mysql.connectionLimit,
    waitForConnections: config.mysql.waitForConnections,
    host     : config.mysql.dbHost,
    user     : config.mysql.dbUser,
    port     : config.mysql.dbPort,
    password : config.mysql.dbPassword,
    database : config.mysql.dbName
});

const Big = require('big.js'); // https://github.com/MikeMcl/big.js -> http://mikemcl.github.io/big.js/

/* ------------------------------------------------------------------------------ */
// // // // // // // // // // // // // // // // // // // // // // // // // // // //
/* ------------------------------------------------------------------------------ */

module.exports = {

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    //DOGECASH

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    /* ------------------------------------------------------------------------------ */
    // Check if user is registered by id
    /* ------------------------------------------------------------------------------ */

    user_registered_check: function(userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_registered_check: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve('error');
                }else{
                    connection.execute("SELECT * FROM user WHERE discord_id = ?",[userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {
                            var errorMessage = "user_registered_check: MySQL query problem. (SELECT * FROM user WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve('error');
                        }else{
                            if(results.length > 0){
                                resolve(true);
                            }else{
                                resolve(false);
                            }
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user id by address
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_id_by_address: function(address){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_id_by_address: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT discord_id FROM user WHERE dogec_deposit_address = ? LIMIT 1",[address],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {
                            var errorMessage = "user_get_id_by_address: MySQL query problem. (SELECT discord_id FROM user WHERE dogec_deposit_address = ? LIMIT 1)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            if(results.length > 0){
                                resolve(results[0].discord_id);
                            }else{
                                resolve('notregisteredaddress');
                            }
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user balance by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_balance: function(userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT dogec_balance FROM user WHERE discord_id = ? LIMIT 1",[userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {
                            var errorMessage = "user_get_balance: MySQL query problem. (SELECT dogec_balance FROM user WHERE discord_id = ? LIMIT 1)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(Big(results[0].balance).toString());
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user stake balance by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_stake_balance: function(userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_stake_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT dogec_stake_balance FROM user WHERE discord_id = ? LIMIT 1",[userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {
                            var errorMessage = "user_get_stake_balance: MySQL query problem. (SELECT dogec_stake_balance FROM user WHERE discord_id = ? LIMIT 1)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(Big(results[0].stake_balance).toString());
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Add stake balance to user
    /* ------------------------------------------------------------------------------ */

    dogec_user_add_stake_balance: function(dogec_stakeAmount,userID,currentDatetime){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_add_stake_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("INSERT INTO user (username,discord_id,dogec_stake_balance,dogec_unstake_datetime) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE dogec_stake_balance = dogec_stake_balance + ?, dogec_unstake_datetime = ?",['tipUser',userID,Big(dogec_stakeAmount).toString(),currentDatetime,Big(dogec_stakeAmount).toString(),currentDatetime],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_add_stake_balance: MySQL query problem. (INSERT INTO user (username,discord_id,dogec_stake_balance) VALUES (?,?,?) ON DUPLICATE KEY UPDATE dogec_stake_balance = dogec_stake_balance + ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user address by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_address: function(userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_address: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT dogec_deposit_address FROM user WHERE discord_id = ? LIMIT 1",[userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {
                            var errorMessage = "user_get_address: MySQL query problem. (SELECT dogec_deposit_address FROM user WHERE discord_id = ? LIMIT 1)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results[0].deposit_address);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Credit balance to user by address
    /* ------------------------------------------------------------------------------ */

    dogec_user_credit_balance: function(dogec_creditAddress,dogec_creditAmount){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_credit_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET dogec_balance = dogec_balance + ? WHERE dogec_deposit_address = ?",[dogec_creditAmount,dogec_creditAddress],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_credit_balance: MySQL query problem. (UPDATE user SET balance = balance + ? WHERE deposit_address = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Substract balance from user by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_substract_balance: function(dogec_substractAmount,userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_substract_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET dogec_balance = dogec_balance - ? WHERE discord_id = ?",[Big(dogec_substractAmount).toString(),userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_substract_balance: MySQL query problem. (UPDATE user SET dogec_balance = dogec_balance - ? WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Substract stake balance from user by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_substract_stake_balance: function(dogec_substractAmount,userID,currentDatetime){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_substract_stake_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET dogec_stake_balance = dogec_stake_balance - ?, dogec_unstake_datetime = ? WHERE discord_id = ?",[Big(dogec_substractAmount).toString(),currentDatetime,userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_substract_stake_balance: MySQL query problem. (UPDATE user SET dogec_stake_balance = dogec_stake_balance - ? WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Add balance to user profile
    /* ------------------------------------------------------------------------------ */

    dogec_user_add_balance: function(dogec_addAmount,userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_add_balance: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("INSERT INTO user (username,discord_id,balance) VALUES (?,?,?) ON DUPLICATE KEY UPDATE dogec_balance = dogec_balance + ?",['tipUser',userID,Big(dogec_addAmount).toString(),Big(dogec_addAmount).toString()],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_add_balance: MySQL query problem. (INSERT INTO user (username,discord_id,balance) VALUES (?,?,?) ON DUPLICATE KEY UPDATE dogec_balance = dogec_balance + ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Add balance to all users from rain all
    /* ------------------------------------------------------------------------------ */

    dogec_user_add_balance_all: function(dogec_addAmount){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_add_balance_all: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET dogec_balance = dogec_balance + ? WHERE discord_id != 'undefined'",[Big(dogec_addAmount).toString()],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_add_balance_all: MySQL query problem. (UPDATE user SET dogec_balance = dogec_balance + ? WHERE discord_id != 'undefined')";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Add deposit address
    /* ------------------------------------------------------------------------------ */

    dogec_user_add_deposit_address: function(dogec_depositAddress,userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_add_deposit_address: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET dogec_deposit_address = ? WHERE discord_id = ?",[dogec_depositAddress,userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_add_deposit_address: MySQL query problem. (UPDATE user SET dogec_balance = dogec_balance + ? WHERE dogec_deposit_address = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user info by id
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_info: function(userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_info: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT * FROM user WHERE discord_id = ?",[userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_get_info: MySQL query problem. (SELECT * FROM user WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Register new user
    /* ------------------------------------------------------------------------------ */

    dogec_user_register: function(userName,userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_info: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("INSERT INTO user (username,discord_id) VALUES (?,?) ON DUPLICATE KEY UPDATE username = ?",[userName,userID,userName],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error){
                            var errorMessage = "user_register: MySQL query problem. (INSERT INTO user (username,discord_id) VALUES (?,?) ON DUPLICATE KEY UPDATE username = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true)
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Update username
    /* ------------------------------------------------------------------------------ */

    dogec_user_update_username: function(userName,userID){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_update_username: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("UPDATE user SET username = ? WHERE discord_id = ?",[userName,userID],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error){
                            var errorMessage = "user_update_username: MySQL query problem. (UPDATE user SET username = ? WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(true)
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get all users that have stake value
    /* ------------------------------------------------------------------------------ */

    dogec_user_get_stake_users: function(){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_stake_users: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT id,discord_id,dogec_stake_balance FROM user WHERE dogec_stake_balance > ?",[0],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error){
                            var errorMessage = "user_get_stake_users: MySQL query problem. (UPDATE user SET username = ? WHERE discord_id = ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results)
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get random users discord ids from database
    /* ------------------------------------------------------------------------------ */

    user_get_discord_ids: function(randomCount){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_discord_ids: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT discord_id FROM user WHERE discord_id != 'undefined' ORDER BY RAND() LIMIT ?",[randomCount],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_get_discord_ids: MySQL query problem. (SELECT discord_id FROM user WHERE discord_id != 'undefined' ORDER BY RAND() LIMIT ?)";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results);
                        }
                    });
                }
            });
        });
    },

    /* ------------------------------------------------------------------------------ */
    // Get user database count
    /* ------------------------------------------------------------------------------ */

    user_get_total_count: function(){
        return new Promise((resolve, reject)=>{
            mysqlPool.getConnection(function(error, connection){
                if(error){
                    try
                        {
                        mysqlPool.releaseConnection(connection);
                        }
                    catch (e){}
                    var errorMessage = "user_get_total_count: MySQL connection problem.";
                    if(config.bot.errorLogging){
                        log.log_write_file(errorMessage);
                        log.log_write_file(error);
                    }
                    log.log_write_console(errorMessage);
                    log.log_write_console(error);
                    resolve(false);
                }else{
                    connection.execute("SELECT count(id) as totalusers FROM user WHERE discord_id != 'undefined'",[],function (error, results, fields){
                        mysqlPool.releaseConnection(connection);
                        if(error)
                        {   
                            var errorMessage = "user_get_total_count: MySQL query problem. (SELECT count(id) FROM user WHERE discord_id != 'undefined')";
                            if(config.bot.errorLogging){
                                log.log_write_file(errorMessage);
                                log.log_write_file(error);
                            }
                            log.log_write_console(errorMessage);
                            log.log_write_console(error);
                            resolve(false);
                        }else{
                            resolve(results);
                        }
                    });
                }
            });
        });
    }

};
