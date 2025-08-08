import { User } from "./database";

async function adding_contest_information(req: any, res: any, next: any) {
  const {
    name,
    email,
    time_duration,
    codeforces_question,
    rating_codeforces,
    leetcode_question,
    solved_leetcode_question,
    rating_leetcode,
    solved_codeforces_question
  } = req.body;

  try {
    const result = await User.findOne({ name, email });

    if (result === null) {
      return res.status(404).json({
        msg: "No such user is found"
      });
    }

    const newContest = {
      time_duration,
      codeforces_question,
      leetcode_question,
      rating_codeforces,
      rating_leetcode,
      solved_codeforces_question,
      solved_leetcode_question,
    };

    const updatedUser = await User.findOneAndUpdate(
      { name, email },
      {
        $push: { contest_information: newContest },
        $inc: {
          total_contest: 1,
          total_question: solved_codeforces_question + solved_leetcode_question,
        }
      },
      { new: true }
    );

    res.status(200).json({
      msg: "Contest info added successfully",
      user : updatedUser
    });

  } catch (error) {
    console.log(error) ; 
    res.status(500).json({
      err: error
    });
  }
}

export default adding_contest_information;
