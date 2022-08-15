import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { IUser } from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export const createAdmin = async (
  requestBody: DocumentDefinition<
    Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">
  >
) => {
  try {
    const user = await UserModel.findOne({ email: requestBody.email });
    if (user) {
      throw new Error("User already exists");
    }

    const newUser = await UserModel.create({
      ...requestBody,
      slug: `BT-${uuidv4()}`,
    });

    return omit(newUser.toObject(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const createMember = async (
  requestBody: DocumentDefinition<
    Omit<IUser, "createdAt" | "updatedAt" | "comparePassword">
  >,
  admin: IUser
) => {
  try {
    const user = await UserModel.findOne({ email: requestBody.email });
    if (user) {
      throw new Error("User already exists");
    }

    const newUser = await UserModel.create({
      ...requestBody,
      slug: admin.slug,
    });
    return omit(newUser.toObject(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const validateUserPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
};

export const findUser = async (query: FilterQuery<IUser>) => {
  const user = await UserModel.findOne(query).lean();
  return user;
};

export const getMembers = async (admin: IUser, limit: number, skip: number) => {
  const count = await UserModel.countDocuments({
    role: "user",
    slug: admin.slug,
  });
  const members = await UserModel.find({
    role: "user",
    slug: admin.slug,
  })
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip);

  return { members, count };
};
