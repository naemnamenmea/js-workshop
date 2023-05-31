describe("pow", function() {
    describe("возводит x в степень n", function() {
        function test1(x) {
            var expected = x * x * x;

            it("при возведении " + x + " в степень 3 результат: " + expected, function() {
                assert.equal(pow(2, 3), expected);
            });
        }

        for(var i = 0; i < 4; i++) {
            test1(x);
        }
    });
});