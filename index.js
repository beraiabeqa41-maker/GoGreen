import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const path = "./data.json";

const makeCommits = async (n) => {
  if (n === 0) {
    console.log("Pushing commits...");
    await git.push();
    return;
  }

  const daysBack = random.int(0, 60);
  const date = moment().subtract(daysBack, "d").format();

  const data = { date };
  console.log("Commit date:", date);

  await jsonfile.writeFile(path, data);

  await git.add([path]);
  await git.commit(date, { "--date": date });

  await makeCommits(n - 1);
};

makeCommits(10);
``