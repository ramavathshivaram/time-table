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
    formState: { errors, isSubmitting },
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
    <div className="flex h-screen w-screen items-center justify-center ">
      <Card className="flex w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-center">
            <h1 className="text-2xl font-bold underline">Join Us</h1>
            <p className="text-gray-500">
              Sign up to unlock powerful tools and seamless workflows.
            </p>
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
            <Button
              type="submit"
              className="w-full mt-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </Button>

            <FieldSeparator className="my-4 col-span-full bg-transparent">
              OR
            </FieldSeparator>

            <GoogleRegisterBtn />
          </form>
        </CardContent>

        <CardFooter className="w-full">
          <div className="text-center w-full text-sm text-muted-foreground">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="font-medium text-primary hover:underline hover:text-primary/80 transition"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
