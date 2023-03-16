import React from "react";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

const Table = () => {
  return (
    <section className="overflow-x-auto w-full">
      <table className="table w-full">
        <TableHead />
        <tbody>
          <TableRow />
          <TableRow />
          <TableRow />
        </tbody>
      </table>
    </section>
  );
};

export default Table;
