var http = require("http");
var employee = require("./Employee")
console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            res.write("<h1>Welcome to Lab Exercise 03</h1>")
        }

        if (req.url === '/employee') {
            // Sets statusCode to 200 OK and adds content type of json
            res.writeHead(200, {"Content-Type": "application/json"})
            //converts object to json
            res.write(JSON.stringify(employee))
        }

        if (req.url === '/employee/names') {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(
                employee.employees.map((e, index) =>
                    `${e.firstName} ${e.lastName}`).sort()
            ))
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format 
            //e.g. { "total_salary" : 100 }
            let total_salary = employee.employees
                .map((e) => e.Salary)
                .reduce((a, b) => a + b, 0)

            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify({'total_salary': total_salary}))
        }
        res.end()
    }
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})