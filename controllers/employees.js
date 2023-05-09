const { prisma } = require('../prisma/prisma-client');

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Can\'t get employees' });
  }
};
const one = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id }
    });
    if (employee) res.status(200).json(employee);
    else res.status(400).json({ message: 'Can\'t get employee' });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    });
  }
};
const create = async (req, res) => {
  try {
    const { firstName, lastName, age, address } = req.body;
    if (!firstName || !lastName || !age || !address) {
      res.status(400).json({ message: 'All fields are required' });
    }
    const userId = req.user?.id;
    const employee = await prisma.employee.create({
      data: { firstName, lastName, age, address, userId }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const update = async (req, res) => {
  try {
    const { firstName, lastName, age, address, id } = req.body;
    if (!id) {
      res.status(400).json({ message: 'Employee is required' });
    }
    const employee = await prisma.employee.update({
      where: { id },
      data: { firstName, lastName, age, address }
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Employee\'s id is required' });
    }
    await prisma.employee.delete({
      where: { id }
    });
    res.status(204).send('Ok');
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { all, create, remove, one, update };