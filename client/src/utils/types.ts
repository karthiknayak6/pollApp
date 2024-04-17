import { z } from "zod";

export const registerSchema = z
  .object({
    f_name: z.string().min(2, "First name must be at least 2 characters"),
    l_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(6, "Password must be at least 10 characters"),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;

export type Option = {
  _id: string
  option_name: string;
  votes: number;
}
export type Poll = {  
  __v: number;
  _id: string;
  author: Voter;
  created_at: string;
  options: Option[];
  title: string;
  total_votes: number;
  voters: Voter[];
}

export type Voter = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string
  polls: Poll[]
  username: string
}



// __v: 2
// ​
// _id: "66198a429242dcaecbbcc16b"
// ​
// author: "66198a0d9242dcaecbbcc164"
// ​
// created_at: "2024-04-12T19:22:45.447Z"
// ​
// options: Array [ {…}, {…} ]
// ​
// title: "Rust or Golang for back-end?"
// ​
// total_votes: 2
// ​
// voters: Array [ "66198a0d9242dcaecbbcc164", "661ee2c51e6239108560e95e" ]


// __v: 0
// ​
// _id: "66198a0d9242dcaecbbcc164"
// ​
// email: "karthiknayak706@gmail.com"
// ​
// first_name: "Karthik"
// ​
// last_name: "Nayak"
// ​
// password: "$2b$10$hI2bxeKiigwfAWVrH6d.4eIwpe7iNrkAClz.hTi0BYw1QoWbVblQW"
// ​
// polls: Array [ "66198a429242dcaecbbcc16b" ]
// ​
// username: "karthik"