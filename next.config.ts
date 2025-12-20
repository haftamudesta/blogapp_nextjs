import type { NextConfig } from "next";
import { hostname } from "os";
import http from "./convex/http";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
      hostname:"images.unsplash.com",
      protocol:"https",
      port:""
    },
    {
        hostname: "unsplash.com",  // Add this for direct unsplash.com URLs
        protocol: "https",
        port: ""
      },
      {
        hostname: "helpful-wren-629.convex.cloud",  // Add this for direct unsplash.com URLs
        protocol: "https",
        port: ""
      }
    ]
  }
};

export default nextConfig;
