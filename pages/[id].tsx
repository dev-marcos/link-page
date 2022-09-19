import { User } from "@prisma/client";
import { Link } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";

import { prisma } from "../lib/prisma";

interface UserProps {
  data: User;
}

export default function PageUser({ data }: UserProps) {
  return (
    <div>
      <span>id: {data.id} </span>
      <br />
      <span>nome: {data.name} </span>
      <br />
      <span>profile: {data.profile} </span>

      <br />

    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const id = params?.id;
  const id = parseInt(params?.id as string);


  const selectedUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return {
    props: { data: selectedUser},
  };
};

export const getStaticPaths: GetStaticPaths = async () => {

  const users = await prisma.user.findMany();

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }));

  return { paths, fallback: false };
};
