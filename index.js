var http = require("http");
var employee = require("./Employee")
var url = require("url")
var querystring = require("querystring")
console.log("Lab 03 -  NodeJs");

//Define Server Port
const port = process.env.PORT || 8081

// Employee data
employees = [
    new employee.Employee(1, "Pritesh", "Patel", "pritesh@gmail.com", 5000),
    new employee.Employee(2, "Krish", "Lee", "krish@gmail.com", 4000),
    new employee.Employee(3, "Racks", "Jacson", "racks@gmail.com", 5500),
    new employee.Employee(4, "Denial", "Roast", "denial@gmail.com", 9000)
]

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.writeHead(405)
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`)
    } else {
        if (req.url === '/') {
            res.write("<h1>Welcome to Lab Exercise 03</h1>")
        }

        if (req.url === '/employee') {
            // Sets statusCode to 200 OK and adds content type of json
            res.writeHead(200, {"Content-Type": "application/json"})
            //converts object to json
            res.write(JSON.stringify(employees))
        }

        if (req.url === '/employee/names') {
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(
                employees.map((e) => e.fullName).sort()
            ))
        }

        if (req.url === '/employee/totalsalary') {
            let total_salary = 
                employees.map((e) => e.salary).reduce((a, b) => a + b, 0)

            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify({'total_salary': total_salary}))
        }

        if (req.url.match(/\/employee\?uid=\d/i)) {
            let employeeId = querystring.parse(url.parse(req.url).query).uid
            let employeeWithId = employees.filter((e) => e.id == employeeId)

            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(employeeWithId[0]))
        }
        res.end()
    }
    res.writeHead(404)
    res.end(`{"error": "${http.STATUS_CODES[404]}"}`)
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})