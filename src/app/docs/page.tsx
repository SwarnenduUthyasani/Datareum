"use client";
import DashHeader from "@/components/headers/dashHeader";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { FaEthereum } from "react-icons/fa";
import { BsDatabaseFill, BsStars } from "react-icons/bs";
import { SiFastapi } from "react-icons/si";
import { PiCopy } from "react-icons/pi";
import { toast } from "react-toastify";
import Container from "@/components/containers/container";
const Docs = () => {
  const [currentTab, setCurrentTab] = useState(2);
  const tabList = [
    {
      id: 1,
      title: "introduction",
      icon: () => <BsStars size={20} color={"#facc15"} />,
    },
    {
      id: 2,
      title: "aPI Refs",
      icon: () => <SiFastapi size={20} color={"#facc15"} />,
    },
    {
      id: 3,
      title: "database",
      icon: () => <BsDatabaseFill size={20} color={"#facc15"} />,
    },
    // {
    //   id: 4,
    //   title: "introduction",
    //   icon: () => <BsStars size={20} color={"#facc15"} />,
    // },
  ];
  return (
    <Container>
      <div className="min-h-screen bg-stone-950">
        <DashHeader />
        <div className="bg-stone-95 flex h-full w-full items-center justify-center pt-20">
          <div className="relative flex h-full w-full max-w-6xl bg-red-900 text-stone-100">
            <div className="fixed top-20 h-full w-64 shrink-0 border border-stone-700 bg-stone-900">
              <div className="flex w-full flex-col items-center justify-center space-y-8 border-b border-stone-700 bg-gradient-to-t from-stone-950 to-stone-900 py-8">
                <div>
                  <FaEthereum size={100} color={"#facc15"} />
                </div>
                <div className="flex flex-col">
                  <div className="text-center text-xl capitalize">offical</div>
                  <div className="text-center text-xl capitalize">
                    documentation
                  </div>
                  <div className="text-center text-xl">(v1)</div>
                </div>
              </div>
              <div className="flex h-full flex-col">
                {tabList.map((tab, index) => {
                  return (
                    <div
                      onClick={() => {
                        setCurrentTab(tab.id);
                      }}
                      key={index}
                      className="flex w-full cursor-pointer items-center space-x-2 border-b border-stone-700 bg-gradient-to-b from-stone-900 to-stone-900 p-2"
                    >
                      <div>
                        <tab.icon />
                      </div>
                      <div className="text-lg capitalize">{tab.title}</div>
                    </div>
                  );
                })}
                <div className="h-full w-full bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950"></div>
              </div>
            </div>
            <div className="borde w-full bg-stone-950 p-4 pl-[17rem]">
              {currentTab === 1 ? (
                <Introduction />
              ) : currentTab === 2 ? (
                <ApiRefs />
              ) : currentTab === 3 ? (
                <Introduction />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Docs;

const Introduction = () => {
  return (
    <div className="flex flex-col space-y-16 rounded-xl border-y border-r border-stone-700 bg-gradient-to-r from-stone-950 to-stone-900 px-4 py-8 pt-32 text-stone-200">
      <div>
        <BsStars size={100} color={"#facc15"} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-5xl capitalize">
          <span className="underline decoration-acc">Datareum</span>{" "}
          Documentation
        </div>
        <div>
          Welcome to the Datareum Documentation. This comprehensive guide
          provides detailed information on how to interact with our platform's
          API, understand the database schema for data submission, and access
          valuable patient data for research purposes.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">introduction</span>{" "}
        </div>
        <div>
          Datareum is a cutting-edge platform designed to facilitate medical
          research by providing access to patient data while ensuring data
          security and privacy. Whether you're a researcher, developer, or
          healthcare professional, this documentation will guide you through the
          process of utilizing our services effectively.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">aPI</span> documentation
        </div>
        <div>
          Our API Documentation section provides insights into how to access
          patient data through the Datareum API. Learn about authentication,
          endpoints, request and response formats, rate limiting, and error
          handling. Leverage the API to retrieve patient information and
          accelerate your research projects.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">Database</span> Schema
        </div>
        <div>
          In the Database Schema section, you will find information about the
          structure of the database where users submit patient data. Understand
          the data fields, data types, and relationships within the schema,
          enabling you to prepare and format data for submission efficiently.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">Getting</span> Started
        </div>
        <div>
          To begin using Datareum's services, explore the sections above to
          access the information you need. Whether you're a newcomer or an
          experienced user, this documentation will help you navigate our
          platform seamlessly.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        {/* <div className="text-4xl capitalize">
                  <span className="underline decoration-acc">Getting</span>{" "}
                  Started
                </div> */}
        <div>
          Now, let's delve into the specifics of utilizing the Datareum
          platform, starting with our API documentation and database schema.
        </div>
      </div>
    </div>
  );
};

const ApiRefs = () => {
  const code = `[
    {
      PreviousDiseases: "Diabetes",
      BloodPressure: "Migraine",
      Allergies: "Migraine",
      PastMedicalConditions: "Migraine",
      Bilirubin: "2",
      SodiumPotassiumLevel: "144/3.68",
      RBCCount: "6",
      LeukocytesCount: "6958",
      SurgicalHistory: "Hypertension",
      Medicines: "Common Cold",
    },
    {
      Disease: "Pneumonia",
      PreviousDiseases: "Bronchitis",
      BloodPressure: "108/64",
      Allergies: "Bronchitis",
      SugarLevel: "125",
      NumberOfTests: "2",
      PastMedicalConditions: "Bronchitis",
      Weight: "66",
      Bilirubin: "2",
      SodiumPotassiumLevel: "137/3.72",
      RBCCount: "4",
      Cholesterol: "139",
      LeukocytesCount: "7985",
      SurgicalHistory: "Flu",
      FamilyMedicalHistory: "Bronchitis",
      Medicines: "Pneumonia",
    },
    // ... more patient records
  ]`;
  return (
    <div className="flex flex-col space-y-16 rounded-xl border-y border-r border-stone-700 bg-gradient-to-r from-stone-950 to-stone-900 px-4 py-8 pt-32 text-stone-200">
      <div>
        <SiFastapi size={100} color={"#facc15"} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-5xl capitalize">
          <span className="underline decoration-acc">API</span> Reference
        </div>
        <div>
          Welcome to the Datareum API Reference Documentation. This guide
          provides detailed information on how to access patient data via the
          Datareum API. To get started, make sure you have an API token, which
          can be obtained from the Dashboard section of your Datareum account.
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">Base</span> URL
        </div>
        <div className="flex w-full flex-col space-y-2">
          <div>The base URL for the Datareum API is:</div>
          <CodeHighlighter
            language="url"
            code={`${process.env.NEXT_PUBLIC_WEB_URL}api/v2`}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">endpoints</span>
        </div>
        <div className="flex w-full flex-col space-y-2">
          <div>Retrieve Patient Data Endpoint:</div>
          <CodeHighlighter language="shell" code={`GET /patients`} />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-bold">Description: </div>
          <div>
            Retrieve patient data stored in the Datareum database. This endpoint
            returns a list of patient objects, with each object containing
            patient details.
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-bold">Request Example: </div>
          <CodeHighlighter
            language="shell"
            code={`GET ${process.env.NEXT_PUBLIC_WEB_URL}api/v2/patients`}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-bold">Response Example: </div>
          <CodeHighlighter language="json" code={code} />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">Authentication</span>{" "}
          {/* Started */}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex flex-col space-y-2">
            <div>
              <span className="font-bold">Sign Up:</span> If you haven't
              already, sign up for a Datareum account.
            </div>
            <div>
              <span className="font-bold">API Key Generation:</span> Generate an
              API key in your Datareum account dashboard.
            </div>
            <div>
              <span className="font-bold">Authentication:</span> Include your
              API key in the headers of your API requests using the
              Authorization header.
            </div>
          </div>
          <CodeHighlighter
            language="headers"
            code={`Authorization: Bearer YOUR_API_TOKEN`}
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="text-3xl capitalize">
          <span className="underline decoration-acc">Example</span> codes
        </div>
        <div className="flex w-full flex-col space-y-2">
          <div>
            Certainly, here's an example of a curl command to make a GET request
            to retrieve patient data from the Datareum API using an API token:
          </div>
          <CodeHighlighter
            language="curl"
            code={`curl -X GET "${process.env.NEXT_PUBLIC_WEB_URL}api/v2/patients" -H "Authorization: Bearer YOUR_API_TOKEN"`}
          />
          <div>
            Replace YOUR_API_TOKEN with the actual API token provided by
            Datareum.
          </div>
        </div>
      </div>
    </div>
  );
};

const CodeHighlighter = ({
  language,
  code,
}: {
  language: string;
  code: string;
}) => {
  return (
    <div className="outline outline-1 outline-stone-700">
      <div className="flex">
        <div className="w-full bg-stone-800 p-2 text-sm capitalize">
          {language}
        </div>
        <div
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            toast.success("Code copied!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              pauseOnFocusLoss: false,
              theme: "dark",
            });
          }}
          className="flex cursor-pointer items-center space-x-2 bg-stone-800 px-2 text-sm"
        >
          <div className="whitespace-nowrap capitalize">copy code</div>
          <PiCopy size={20} />
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={a11yDark}
        wrapLines
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
