drop database if exists cnpm;

create database cnpm;

USE cnpm;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    DoB DATE,
    phone VARCHAR(15),
    address VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    status VARCHAR(50),
    pageBalance DECIMAL(10),
    avtLink VARCHAR(255)
);

INSERT INTO users (name, DoB, phone, address, email, password, status, pageBalance, avtLink)
VALUES
  ('John Doe', '1990-01-15', '0906112789', '123 Main St', 'john.doe@example.com', 'hashedpassword1', 'Active', 100, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0fD8K3vn_KC4vBp8VBb1tWYomAQEDsF_MFw&usqp=CAU'),
  ('Jane Smith', '1985-03-22', '0906112789', '456 Oak St', 'jane.smith@example.com', 'hashedpassword2', 'Inactive', 75, 'https://static-00.iconduck.com/assets.00/female-avatar-illustration-2048x2048-5c2az6ba.png'),
  ('Alice Johnson', '1992-08-10', '0906112789', '789 Pine St', 'alice.johnson@example.com', 'hashedpassword3', 'Active', 120, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ1W5fo9cGyQcxSyBPgv3xgDbodrfkXyBpWw&usqp=CAU'),
  ('Bob Williams', '1988-05-18', '0906112789', '101 Maple Ave', 'bob.williams@example.com', 'hashedpassword4', 'Active', 90, 'https://cdn1.iconfinder.com/data/icons/user-pictures/100/female1-512.png'),
  ('Emily Davis', '1995-11-30', '0906112789', '202 Birch St', 'emily.davis@example.com', 'hashedpassword5', 'Inactive', 60, 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043251-avatar-female-girl-woman_113291.png'),
  ('Michael Brown', '1982-04-05', '0906112789', '303 Cedar St', 'michael.brown@example.com', 'hashedpassword6', 'Active', 150, 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg'),
  ('Zoe Miller', '1993-09-12', '0906112789', '404 Oak St', 'zoe.miller@example.com', 'hashedpassword7', 'Inactive', 80, 'https://www.terrainhopperusa.com/wp-content/uploads/2019/01/avatar-woman.png'),
  ('Daniel White', '1987-02-25', '0906112789', '505 Pine St', 'daniel.white@example.com', 'hashedpassword8', 'Active', 110, 'https://cdn2.iconfinder.com/data/icons/fashion-1-5/48/32-512.png'),
  ('Sophia Taylor', '1994-07-07', '0906112789', '606 Elm St', 'sophia.taylor@example.com', 'hashedpassword9', 'Active', 130, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfpU1SBOIBNYiGKh4dETJ0XUOTa99Xhxqqjg&usqp=CAU'),
  ('Ethan Davis', '1991-06-20', '0906112789', '707 Maple Ave', 'ethan.davis@example.com', 'hashedpassword10', 'Inactive', 95, 'https://cdn.icon-icons.com/icons2/2859/PNG/512/avatar_face_girl_female_woman_profile_smiley_happy_people_icon_181662.png'),
  ('Olivia Smith', '1984-03-14', '0906112789', '808 Birch St', 'olivia.smith@example.com', 'hashedpassword11', 'Active', 115, 'https://e7.pngegg.com/pngimages/956/783/png-clipart-computer-icons-female-youtube-woman-avatar-business-woman-face-black-hair-thumbnail.png'),
  ('Noah Johnson', '1996-10-05', '0906112789', '909 Cedar St', 'noah.johnson@example.com', 'hashedpassword12', 'Inactive', 70, 'https://cdn1.iconfinder.com/data/icons/business-avatar-circle/64/26_avatar_people_business_businesswoman_woman_female_long_hair-512.png'),
  ('Ava Williams', '1989-07-28', '0906112789', '1010 Elm St', 'ava.williams@example.com', 'hashedpassword13', 'Active', 125, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm6smRPXPiHDsytMi7pXb3uZyi38_tK6UJWg&usqp=CAU'),
  ('Liam Brown', '1997-02-09', '0906112789', '1111 Oak St', 'liam.brown@example.com', 'hashedpassword14', 'Active', 135, 'https://static.vecteezy.com/system/resources/previews/024/183/535/original/male-avatar-portrait-of-a-young-man-with-glasses-illustration-of-male-character-in-modern-color-style-vector.jpg'),
  ('Emma Davis', '1983-08-23', '0906112789', '1212 Pine St', 'emma.davis@example.com', 'hashedpassword15', 'Inactive', 85, 'https://img.freepik.com/premium-vector/man-character_665280-46970.jpg'),
  ('Mason White', '1990-01-15', '0906112789', '1313 Maple Ave', 'mason.white@example.com', 'hashedpassword16', 'Active', 105, 'https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'),
  ('Isabella Taylor', '1985-04-07', '0906112789', '1414 Birch St', 'isabella.taylor@example.com', 'hashedpassword17', 'Inactive', 65, 'https://png.pngtree.com/png-clipart/20190705/original/pngtree-man-avatar-icon-professional-man-character-png-image_4356027.jpg'),
  ('James Miller', '1992-09-20', '0906112789', '1515 Cedar St', 'james.miller@example.com', 'hashedpassword18', 'Active', 145, 'https://cdn0.iconfinder.com/data/icons/avatar-78/128/3-512.png'),
  ('Grace Brown', '1986-05-18', '0906112789', '1616 Elm St', 'grace.brown@example.com', 'hashedpassword19', 'Inactive', 75, 'https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg'),
  ('Benjamin Johnson', '1993-11-30', '0906112789', '1717 Oak St', 'benjamin.johnson@example.com', 'hashedpassword20', 'Active', 95, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IXhKUjSU4XaJVQx6elmvvPNiexjJAP9Jmg&usqp=CAU');

select * from users;

CREATE TABLE spso (
    spsoID INT PRIMARY KEY
);

INSERT INTO spso (spsoID)
VALUES 
	(1),
    (2);

select * from spso;

SELECT * FROM users WHERE email='john.doe@example.com' AND password='hashedpassword2';


