package com.getcapacitor.plugin.camera;

public enum MediaType {
    PHOTO("PHOTO"),
    VIDEO("VIDEO");

    private String type;

    MediaType(String type) {
        this.type = type;
    }

    public String getType() {
        return this.type;
    }

}
