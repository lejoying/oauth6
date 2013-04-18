/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 *  http://127.0.0.1:8062/api2/account/add?
 *  http://127.0.0.1:8062/api2/account/auth?i=0
 */

var accountManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

accountManage.add = function (response) {
    response.asynchronous = 1;
    account =
    {
        "accountName":"wwww2",
        "type":"account",
        "password":"8768fd54fd687fd867f465d",
        "phone":"15120080001",
        "phoneStatus":"verified",
        "email":"w1001@163.com",
        "emailStatus":"verifying#366541",
        "accessKey":["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };

    db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
        if (node == null) {
            db.getIndexedNode("account", "phone", account.phone, function (err, node) {
                if (node == null) {
                    db.getIndexedNode("account", "email", account.email, function (err, node) {
                        if (node == null) {
                            var node = db.createNode(account);
                            node.save(function (err, node) {
                                node.data.uid = node.id;
                                node.index("account", "accountName", account.accountName);
                                node.index("account", "phone", account.phone);
                                node.index("account", "email", account.email);
                                node.save(function (err, node) {
                                    response.write(JSON.stringify({
                                        "information":"/api2/account/add  success",
                                        "node":node.data
                                    }));
                                    response.end();
                                });
                            });
                        }
                        else {
                            response.write(JSON.stringify({
                                "information":"/api2/account/add  failed",
                                "reason":"email has existed."
                            }));
                            response.end();
                        }
                    });
                } else {
                    response.write(JSON.stringify({
                        "information":"/api2/account/add  failed",
                        "reason":"phone number has existed."
                    }));
                    response.end();
                }
            });
        }
        else {
            response.write(JSON.stringify({
                "information":"/api2/account/add  failed",
                "reason":"account name has existed."
            }));
            response.end();

        }
    });

}


accountManage.auth = function (response) {
    response.asynchronous = 1;
    account =
    {
        "accountName":"wwww2",
        "type":"account",
        "password":"8768fd54fd687fd867f465d",
        "phone":"15120080001",
        "phoneStatus":"verified",
        "email":"w1001@163.com",
        "emailStatus":"verifying#366541",
        "accessKey":["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };


    response.write(JSON.stringify({
        "uid":"111",
        "accessKey":"f5d4f5d46f4d65f4d654f56d4f",
        "PbKey":"null"
    }));
    response.end();

}

module.exports = accountManage;