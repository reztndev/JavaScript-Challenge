// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');


// define a global employees array to house the employees info that are entered by the user
let employeesArray = new Array();


// Collect employee data
const collectEmployees = function() 
{
  // TODO: Get user input to create and return an array of employee objects
  let continueCollectingUserInput = true;
  while( continueCollectingUserInput) 
  {
    // Initialze the local employee object with dummy data
    let employee = { 
      firstName: "John",
      lastName: "Doe",
      salary: 10
    }
    
    // Prompt the user to enter the comma delimited employee(s) data
    const promptInput = window.prompt( "Enter new employee's First Name, Last Name, Salary" );

    // Break out of the while loop if the user clicks on the cancel button
    if( promptInput === null){
      break;
    }

    // Split the comma delimited user enteries into separate tokens in an array
    const userInput = promptInput.split(",");  

    // Populate the employee object with user enteries 
    employee.firstName = userInput[0];
    employee.lastName = userInput[1];

    // Note that the utilization of isNaN function is unnecessary as the salary info can be cast to a Number on the fly
    employee.salary = Number( userInput[2] ); 
    
    console.log( "userInput array:", userInput);
    console.log( "employee object: ", employee );
  
    // Push the fully populated local employee obect to the employeesArray that is returned from this function
    employeesArray.push( employee );  

    console.log( "employeeArray: ", employeesArray );
  }

  return employeesArray;
}

// Display the average salary
const displayAverageSalary = function(employeesArray) {

  // Calculate and display the average salary
  let numberOfEmployees = employeesArray.length;
  
  let totalSalary = 0;
  for( let i=0; i<numberOfEmployees; i++) {
    totalSalary += employeesArray[i].salary;
  }

  let averageSalary = totalSalary / employeesArray.length;

  console.log( "The average employee salary between our", numberOfEmployees, "employee(s) is:", averageSalary );
}

// Select and display a random employee
const getRandomEmployee = function(employeesArray) {
  
  const randomlySelectedEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)];
  let firstName = randomlySelectedEmployee.firstName;
  let lastName = randomlySelectedEmployee.lastName;
  console.log("Congratulations to " + firstName + lastName + ", our random drawing winner!" );
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() 
{
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) 
  {
    if (a.lastName < b.lastName) 
    {
      return -1;
    } else 
    {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
