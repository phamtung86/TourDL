package org.example.response;

public class JwtResponse {
    private int id;
    private String token;

    public JwtResponse(int id, String token) {
        this.id = id;
        this.token = token;
    }

    public JwtResponse() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
