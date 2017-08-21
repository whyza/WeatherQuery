package com.weatherquery.sysmanage.serlvet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Query extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			request.setCharacterEncoding("UTF-8");
			response.setCharacterEncoding("UTF-8");
			String city = request.getParameter("city");
			String result = getResult(city);
			response.getWriter().print(result);
	}
	public static String getResult(String city) {
		String IP = "http://v.juhe.cn/weather/ip?format=2&key="+"1ae9a744c5e2c305f0632db8a9d38945"+"&ip="+city;
		String queryUrl = "http://v.juhe.cn/weather/index?format=2&cityname="+city+"&key=1ae9a744c5e2c305f0632db8a9d38945";
		InputStream is = null;
		InputStreamReader ir = null ;
		BufferedReader br = null;
		StringBuffer sb = new StringBuffer();
		try {
			URL url = null;
			if(city.charAt(0)>47 && city.charAt(0)<58){
			url = new URL(IP);  //�������Ӷ���
			}else{
			url = new URL(queryUrl); 
			}
			
			URLConnection connection = url.openConnection();		  //������
			 is = connection.getInputStream();
			 ir = new InputStreamReader(is);
			 br = new BufferedReader(ir);
			 String line = "";
			 while((line=br.readLine()) !=null ){
				 sb.append(line);
			 }
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			try{
				if(br!=null){
					br.close();
				}
				if(ir!=null){
					ir.close();
				}
				if(is!=null){
					is.close();
				}	
			}catch(IOException e){
				e.printStackTrace();
			}	
		}
		return sb.toString();	
	}
}
