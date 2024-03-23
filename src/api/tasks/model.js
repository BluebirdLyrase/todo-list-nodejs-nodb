const fs = require('fs');
const { promisify } = require('util');
const dayjs = require(`dayjs`);
const folderPath = `./public/tasks`;

class TasksModel {
  async getAllTask() {
    const readdir = promisify(fs.readdir);
    const fileList = await readdir(folderPath);
    return fileList.map((file) => {
      const rawData = fs.readFileSync(`${folderPath}/${file}`);
      return JSON.parse(rawData);
    });
  }

  async createTask(content) {
    const writeFile = promisify(fs.writeFile);
    const timestamp = dayjs().unix();
    const randomNum = Math.random();
    const id = `${timestamp}-${randomNum}`;
    await writeFile(
      `${folderPath}/${id}.json`,
      JSON.stringify({ id, ...content }, null, 4)
    );
    return { id };
  }

  async getTask(id) {
    const rawData = fs.readFileSync(`${folderPath}/${id}.json`);
    return JSON.parse(rawData);
  }

  async updateTask(id, content) {
    const writeFile = promisify(fs.writeFile);
    await writeFile(
      `${folderPath}/${id}.json`,
      JSON.stringify({ id, ...content }, null, 4)
    );
    return { id };
  }

  async deleteTask(id) {
    const deleteFile = promisify(fs.unlink);
    await deleteFile(`${folderPath}/${id}.json`);
    return { id };
  }

  async checkTaskExist(id) {
    return fs.existsSync(`${folderPath}/${id}.json`);
  }
}

module.exports = new TasksModel();
