import BimServerClient from '../client/bimserverclient.js';

describe("bimserverclient", function() {
    var bim;
    var base_url = "http://localhost:9876";
	var xhr = new XMLHttpRequest(); 

    beforeEach(function () {
        bim = new BimServerClient(base_url);
		xhr = new XMLHttpRequest(); 
    });

    it("should be able to get hallo", function () {
		xhr.open( "GET", base_url + '/hello', false ); // false for synchronous request
		xhr.send( null );
        expect(xhr.status).toBe(200);
    });

    it("should be able to get version", function () {
        bim.init((client, version) => {
            expect(version).toBe("1.0");
            done();
        });
    });

    it("should be able to upload", function () {
        bim.checkin('topic', 'project', 'comment', 'file', 'oid', (percentage) => {}, (checkinid) => {
            expect(checkinid).toBe("124");
            done();
        }, (exception) => {});
    });

});