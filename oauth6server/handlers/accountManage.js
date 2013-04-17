/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 *  http://127.0.0.1:8062/api2/account/add?
 *  http://127.0.0.1:8062/api2/neo4j/reset?i=0
 */

var accountManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

accountManage.add = function (response) {
    response.asynchronous = 1;
    account =
    {
        "accountname":"wwww1",
        "type":"account",
        "password":"8768fd54fd687fd867f465d",
        "phone":"15120088197#verified",
        "phone1":JSON.stringify({
            "phoneNumber":"15120088197",
            "status":"verified"
        }),
        "email":"wsds888@163.com#verifying%#366541",
        "accesskey":["f5d4f5d46f4d65f4d654f56d4f", "4f54d6f54d65f45d6f465d4f65"]
    };

    var node = db.createNode(account);
    node.save(function (err, node) {
        node.data.uid = node.id;
        node.index("account", "accountname", account.accountname);
        node.index("account", "phone", account.phone);
        node.index("account", "email", account.email);
        node.save(function (err, node) {
            var t2=node.data;
            var t1=JSON.parse(t2.phone1);
            response.write(JSON.stringify({
                "information":"/api2/account/add  success",
                "node": t1
            }));
            response.end();
        });
    });
}


accountManage.reset = function (i, response) {
    response.asynchronous = 1;

    var access = parseInt(i);
    var node;
    db.getNodeById(nodeId, function (err, node) {
        node.data.access = access;
        node.save(function (err, node) {
            response.write(JSON.stringify({
                "information":"/api2/neo4j/reset  success",
                "access":access,
                "node":node.data
            }));
            response.end();
        });
    });
}

module.exports = accountManage;