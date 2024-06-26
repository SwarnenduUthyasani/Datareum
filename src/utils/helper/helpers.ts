import { auth } from "@/firebase/firebase";
import {
  InputObject,
  PatientBC,
  PatientDB,
  objectType,
  userData,
} from "@/types/types";
import axios from "axios";
import { User } from "firebase/auth";

export const isEmailValid = (email: string) => {
  // Regular expression for validating email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPhoneNumber = (str: string) => {
  // Remove leading and trailing whitespaces, if any
  str = str.trim();

  // Check if the string contains exactly 10 digits using regex
  const tenDigitRegex = /^\d{10}$/;
  return tenDigitRegex.test(str);
};

export const switchSizeReturner = (num: number): any => {
  return num;
};

export const uploadUserFull = async (
  name: string,
  org: string,
  email: string,
  phoneNumber: string,
  isContributing: boolean,
  isTacAccepted: boolean,
) => {
  await axios.post(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
    {
      name: name,
      org: org,
      email: email,
      phone: phoneNumber,
      isOrgVerified: false,
      isEmailVerified: false,
      isPhoneVerified: true,
      canContribute: true,
      isGod: phoneNumber === process.env.NEXT_PUBLIC_ADMIN ? true : false,
      canDownload: false,
      token: "initial",
      fireUid: auth.currentUser?.uid,
      isContributor: isContributing,
      isTac: isTacAccepted,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    },
  );
};

export const isPhoneNumberPresent = (
  listOfObjects: userData[],
  phoneNumber: string,
): boolean => {
  console.log(listOfObjects, phoneNumber);
  return listOfObjects.some((obj: userData) => obj.phone == phoneNumber);
};

export const findObjectByFireUid = (
  listOfObjects: userData[],
  fireUidToFind: any,
): userData | undefined => {
  return listOfObjects.find((obj: userData) => obj.fireUid === fireUidToFind);
};

export const convertBigIntsToInts = (
  listOfObjects: objectType[],
): objectType[] => {
  return listOfObjects.map((obj) => {
    const convertedObj: objectType = {};
    for (const key in obj) {
      if (typeof obj[key] === "bigint") {
        convertedObj[key] = Number(obj[key]);
      } else {
        convertedObj[key] = obj[key];
      }
    }
    return convertedObj;
  });
};

export const getGreeting = (): string => {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good evening";
  } else {
    return "hey welcome";
  }
};

export const randomStringGenerator = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  const randomValues = new Uint32Array(length);
  let result = "";

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(randomValues);
  } else {
    throw new Error("crypto.getRandomValues() not available.");
  }

  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % charactersLength);
  }

  return result;
};

export const tokenGenerator = async (
  userData: userData,
  refresher: () => {},
) => {
  const newToken: string = randomStringGenerator(50);
  const newUserData: userData = {
    name: userData.name,
    org: userData.org,
    email: userData.email,
    phone: userData.phone,
    isOrgVerified: userData.isOrgVerified,
    isEmailVerified: userData.isEmailVerified,
    isPhoneVerified: userData.isPhoneVerified,
    canContribute: userData.canContribute,
    canDownload: userData.canDownload,
    token: newToken,
    isGod: userData.isGod,
    fireUid: userData.fireUid,
    isTac: userData.isTac,
  };
  await axios.put(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
    newUserData,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    },
  );
  refresher();
};

export const getAllUsersData = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    },
  );
  console.log(data);
  return data;
};

export const getDashUserData = async (user: User) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_WEB_URL}api/dev/users`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_SECRET}`,
      },
    },
  );
  const thisUser: userData | undefined = findObjectByFireUid(data, user?.uid);
  return thisUser;
};

export const combineDataAndSecretKeys = (
  dataFromDb: PatientDB[],
  dataFromBc: PatientBC[],
): InputObject[] => {
  const combinedObjects: InputObject[] = [];
  for (const dbObj of dataFromDb) {
    const matchingSecretKeyObj = dataFromBc.find(
      (bcObj) => bcObj.identifier === dbObj.identifier,
    );
    if (matchingSecretKeyObj) {
      const combinedObj: InputObject = {
        identifier: dbObj.identifier,
        secretKey: matchingSecretKeyObj.secretKey,
        data: dbObj.data,
      };
      combinedObjects.push(combinedObj);
    }
  }

  return combinedObjects;
};

export const verifyToken = (
  objList: userData[],
  tokenToCheck: string,
): boolean => {
  for (const obj of objList) {
    if (obj.token === tokenToCheck) {
      return true;
    }
  }
  return false;
};

export const countObjectsWithNonInitialToken = (
  objects: userData[],
): number => {
  let count = 0;

  for (const obj of objects) {
    if (obj.hasOwnProperty("token") && obj.token !== "initial") {
      count++;
    }
  }

  return count;
};

export const scroller = async () => {
  const LocomotiveScroll = (await import("locomotive-scroll")).default;
  new LocomotiveScroll();
};
