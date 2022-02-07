package com.hbl.kms.app.main;

import com.hbl.kms.app.test.mapper.TestMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class MainController {

    private final TestMapper testMapper;

    @GetMapping("/main")
    public String main(Model model) {

        int a = testMapper.selectTest();
        model.addAttribute("a", a);
        return "main/main";
    }

}
