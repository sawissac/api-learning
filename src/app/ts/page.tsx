import React from "react";

type NextRequest = {
  name: string;
  age: number;
};

type NextContext = {
  params: {
    id: string;
  };
};

const TypeScript = () => {
  const request: NextRequest = {
    name: "TypeScript",
    age: 25,
  };

  const ctx: NextContext = {
    params: {
      id: "1",
    },
  };

  function nextRequest(
    request: NextRequest,
    ctx: { params: { id: string } }
  ): number {
    return request.age + Number(ctx.params.id);
  }

  console.log(nextRequest(request, ctx));

  return <div />;
};

export default TypeScript;
