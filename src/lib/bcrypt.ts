import bcryptjs from "bcryptjs";

const hash = (data: string, saltRounds = 10) => {
  return new Promise<string>((resolve, reject) => {
    bcryptjs.hash(data, saltRounds, (err, hashed) => {
      if (err) return reject(err);
      resolve(hashed);
    });
  });
};

const compare = (data: string, hashed: string) => {
  return new Promise<boolean>((resolve, reject) => {
    bcryptjs.compare(data, hashed, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });
};

export default { hash, compare };
