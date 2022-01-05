INSERT INTO users (name,email,password)
VALUES('Belle LeBlanc','belleleblanc@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Beast LeBlanc','beastleblanc@gmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Shea LaBoeuf','sheala@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley','sebastianguerra@ymail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Meyer','jacksonrose@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id,title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active)
VALUES(1,'Hobbitville','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',93061,6,4,8,'Canada','536 Namsub Highway','Stoboske','Quebec','28142',true),

(1,'House on the prairie','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',85234,6,6,7,'Canada','651 Nami Road','Bohbatev','Alberta','83680',true),

(2,'Port property','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',46058,0,2,3,'Canada','1650 Hejto Center','Genwezug','Newfoundland and Labrador','44538',true),

(4,'House in the woods','description','https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg',2358,0,1,2,'Canada','340 Dokto Park','Victoria','British Columbia','29045',true); 

INSERT INTO reservations(start_date,end_date,property_id,guest_id) 
VALUES('2018-09-11','2018-09-26',1,3),
('2019-01-04','2019-02-01',1,5),
('2015-09-13','2015-09-30',3,3);

INSERT INTO property_reviews (guest_id,property_id,reservation_id,rating,message)
VALUES (3,1,1,5,'message'),
(5,1,2,3,'message'),
(3,3,3,4,'message');