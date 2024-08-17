/*var express = require("express");
var path = require("path");
var compiler = require("compilex");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var option = { stats: true };
compiler.init(option);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/compilecode", function(req, res) {
    console.log(req.body)
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    if (lang === "C" || lang === "C++") {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        if (inputRadio === "true") {
            compiler.compileCPPWithInput(envData, code, input, function(data) {
                console.log("Compile result:", data);
                if (data.error) {
                    res.json({ output: data.error });
                } else {
                    res.json({ output: data.output });
                }
            });
        } else {
            compiler.compileCPP(envData, code, function(data) {
                console.log("Compile result:", data);
                if(data.error) {
                    res.json({ output: data.error });
                }
                else {
                    res.json({ output: data.output });
                }
            });
        }
    } else if (lang === "Python") {
        var envData = { OS: "windows" };
        if (inputRadio === "true") {
            compiler.compilePythonWithInput(envData, code, input, function(data) {
                console.log("Compile result:", data);
                if(data.error) {
                    res.json({ output: data.error });
                }
                else{
                    res.json({ output: data.output });
                }
            });
        } else {
            compiler.compilePython(envData, code, function(data) {
                console.log("Compile result:", data);
                if(data.error) {
                    res.json({ output: data.error });
                }
                else{
                    res.json({ output: data.output });
                }
        });
    }
}
});

app.get("/fullStat", function(req, res) {
    compiler.fullStat(function(data) {
        res.send(data);
    });
});

app.listen(3815, function() {
    console.log("Server is running on port 3815");
});

compiler.flush(function() {
    console.log("All temporary files flushed!");
});
*/
var express = require("express");
var path = require("path");
var compiler = require("compilex");

var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var option = { stats: true };
compiler.init(option);

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/compilecode", function(req, res) {
    console.log(req.body);
    var code = req.body.code;
    var input = req.body.input;
    var inputRadio = req.body.inputRadio;
    var lang = req.body.lang;

    if (lang === "C" || lang === "C++") {
        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };
        if (inputRadio === "true") {
            compiler.compileCPPWithInput(envData, code, input, function(data) {
                console.log("Compile result:", data);
                res.json({ output: data.error || data.output });
            });
        } else {
            compiler.compileCPP(envData, code, function(data) {
                console.log("Compile result:", data);
                res.json({ output: data.error || data.output });
            });
        }
    } else if (lang === "Python") {
        var envData = { OS: "windows" };
        if (inputRadio === "true") {
            compiler.compilePythonWithInput(envData, code, input, function(data) {
                console.log("Compile result:", data);
                res.json({ output: data.error || data.output });
            });
        } else {
            compiler.compilePython(envData, code, function(data) {
                console.log("Compile result:", data);
                res.json({ output: data.error || data.output });
            });
        }
    }
});

app.get("/fullStat", function(req, res) {
    compiler.fullStat(function(data) {
        res.send(data);
    });
});

const PORT = process.env.PORT || 3815;
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

compiler.flush(function() {
    console.log("All temporary files flushed!");
});