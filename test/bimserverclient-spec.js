import BimServerClient from '../client/bimserverclient.js';

describe("bimserverclient", function () {
    var bim;
    var base_url = "http://localhost:9876";
    var xhr = new XMLHttpRequest();

    beforeEach(function () {
        bim = new BimServerClient(base_url);
        xhr = new XMLHttpRequest();
    });

    it("should be able to get hallo", function () {
        xhr.open("GET", base_url + '/hello', false); // false for synchronous request
        xhr.send(null);
        expect(xhr.status).toBe(200);
    });

    describe("when returned version", function () {
        var version;
        beforeEach(function (done) {
            bim.init((client, serverInfo) => {
                version = serverInfo.version;
                done();
            });
        });
        it("should have version", function () {
            expect(version).toBe("1.0");
        });
    });

    describe("when uploaded", function () {
        var checkinid;
        beforeEach(function (done) {
            bim.checkin('topic', 'project', 'comment', 'file', 'oid', (percentage) => {
                console.log("in percentage!!!");
            }, (id) => {
                console.log("in success!!!");
                checkinid = id;
                done();
            }, (exception) => {
                console.log("in ex!!!");
                done();
            });
        });
        it("should have checkinid", function () {
            expect(checkinid).toBe("123");
        });
    });


});