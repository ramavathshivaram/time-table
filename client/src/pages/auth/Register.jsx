import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";

import { useNavigate } from "react-router-dom";

import useAuthStore from "@/store/auth.store.js";
import GoogleRegisterBtn from "./GoogleRegisterBtn";

const Register = () => {
  const registerFunction = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerFunction(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="flex w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold underline">Register</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">User Name</FieldLabel>
                  <Input
                    id="userName"
                    placeholder="bob"
                    {...register("userName", {
                      required: "User Name is required",
                      minLength: {
                        value: 3,
                        message: "User Name must be at least 3 characters",
                      },
                    })}
                  />
                  {errors.userName && (
                    <FieldError>{errors.userName.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    placeholder="abc@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    type="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>
            <Button type="submit" className="w-full mt-5">
              Register
            </Button>

            <FieldSeparator className="my-4 col-span-full">OR</FieldSeparator>

            <GoogleRegisterBtn />
          </form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <p className="text-center">
            have an account?
            <Link to="/login" className="underline text-blue-600">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
