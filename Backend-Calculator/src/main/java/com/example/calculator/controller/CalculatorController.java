package com.example.calculator.controller;

import com.example.calculator.model.OperationRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calculator")
@CrossOrigin(origins = "http://localhost:5173") // allow React frontend
public class CalculatorController {
    @PostMapping("/calculate")
    public double calculate(@RequestBody OperationRequest request) {
        double result = 0;
        switch (request.getOperation().toLowerCase()) {
            case "add": result = request.getNum1() + request.getNum2();
                break;
            case "subtract": result = request.getNum1() - request.getNum2(); break;
            case "multiply": result = request.getNum1() * request.getNum2(); break;
            case "divide":
                if (request.getNum2() == 0) throw new
                        ArithmeticException("Cannot divide by zero");
                result = request.getNum1() / request.getNum2();
                break;
            default: throw new IllegalArgumentException("Invalid operation");
        }
        return result;
    }
}
