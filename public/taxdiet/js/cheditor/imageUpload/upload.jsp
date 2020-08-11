<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="java.io.*" %>
<%@ page import="com.oreilly.servlet.*" %>
<%@ page import="com.oreilly.servlet.multipart.*" %>
<%@ include file="config.jsp" %>
<%
int fileSizeLimit = 50 * 1000 * 1000;
String encoding = "utf-8";

try {
    MultipartRequest mRequest = new MultipartRequest(request, SAVE_DIR, fileSizeLimit, encoding, new DefaultFileRenamePolicy());

    String saveFileName = mRequest.getFilesystemName("file");
    String passExeList = "png,jpg,jpeg,gif,bmp";
    String exeName = saveFileName.substring(saveFileName.toLowerCase().lastIndexOf(".")+1, saveFileName.length());
    
    if(passExeList.indexOf(exeName) < 0) {
		File file = new File(SAVE_DIR+saveFileName);
		file.delete();    	
    	throw new Exception("-ERR: "+exeName+" does not support. ");	
    }
    
    long fileSize = 0;
    File file = mRequest.getFile("file");
    if (file == null) {
        throw new Exception("-ERR: No File");
    }

    fileSize = file.length();
    if (fileSize < 1) {
        throw new Exception("-ERR: File Size 0");
    }

    String rData = String.format("{\"fileUrl\":\"%s%s\", \"filePath\":\"%s%s\", \"fileName\":\"%s\", \"fileSize\":\"%d\"}", 
                            SAVE_URL, saveFileName, SAVE_DIR, saveFileName, saveFileName, fileSize);

    out.println(rData);

} catch(Exception e) {
    System.out.println(e.getMessage());
}
%>