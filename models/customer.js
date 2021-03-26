module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    business_name: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    phone_number: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      defaultValue: null
    },
    client_type: {
      type: DataTypes.ENUM,
      values: ["customer", "business-owner"],
      allowNull: false,
      defaultValue: "customer"
    }
  });

  Customer.associate = models => {
    Customer.hasMany(models.Orders, {});
  };

  return Customer;
};
