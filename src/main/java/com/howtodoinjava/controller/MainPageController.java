package com.howtodoinjava.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.howtodoinjava.util.MailerUtils;

@Controller
public class MainPageController {

	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String getHomePage(ModelMap model) {
		return "homePage";
	}

	@RequestMapping(value = "/aboutUs", method = RequestMethod.GET)
	public String getAboutUs(ModelMap model) {
		return "aboutUsPage";
	}

	@RequestMapping(value = "/services", method = RequestMethod.GET)
	public String getServices(ModelMap model) {
		return "servicesPage";
	}

	@RequestMapping(value = "/networks", method = RequestMethod.GET)
	public String getNetworks(ModelMap model) {
		return "networkPage";
	}

	@RequestMapping(value = "/contact", method = RequestMethod.GET)
	public String getContact(ModelMap model) {
		return "contactPage";
	}

	@RequestMapping(value = "/contact/save", method = RequestMethod.POST)
	public @ResponseBody
	String saveContact(@RequestParam(value = "name") String name,
			@RequestParam(value = "email") String email,
			@RequestParam(value = "subject") String subject,
			@RequestParam(value = "content") String content, ModelMap model)
			throws Exception {
		StringBuffer sb = new StringBuffer();
		sb.append(name);
		sb.append("/");
		sb.append(email);
		sb.append(" Wanna contact you. Here is content: ");
		sb.append(content);
		MailerUtils.Send("david@dp-global.vn", "", subject, sb.toString());
		return "";
	}
}
