CREATE DATABASE IF NOT EXISTS pocket_plant
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE pocket_plant;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS ai_chat_messages;
DROP TABLE IF EXISTS ai_chat_rooms;
DROP TABLE IF EXISTS board_images;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS sensor_data;
DROP TABLE IF EXISTS social_logins;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS plant_data;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nickname VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    profile_image VARCHAR(255),
    role VARCHAR(255),
    auth_version VARCHAR(36) UNIQUE,
    is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    kakao_id VARCHAR(255) UNIQUE,
    naver_id VARCHAR(255) UNIQUE,
    login_type ENUM('GENERAL', 'KAKAO', 'NAVER') NOT NULL DEFAULT 'GENERAL',
    created_at DATETIME(6),
    updated_at DATETIME(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE plant_data (
    cntnt_no BIGINT PRIMARY KEY,
    plant_name VARCHAR(255),
    growh_tp VARCHAR(255),
    winter_temperature VARCHAR(255),
    humidity VARCHAR(255),
    water_cycle_spring VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    character_id BIGINT,
    name VARCHAR(255) NOT NULL,
    species VARCHAR(255),
    adopt_date DATE,
    age INT,
    personality VARCHAR(255),
    mac_address VARCHAR(255),
    image_url VARCHAR(500),
    is_bookmarked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_plants_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_plants_user_id (user_id),
    INDEX idx_plants_mac_address (mac_address)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE social_logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    provider VARCHAR(255),
    social_id VARCHAR(255),
    access_token VARCHAR(255),
    refresh_token VARCHAR(255),
    token_expiry VARCHAR(255),
    created_at VARCHAR(255),
    CONSTRAINT fk_social_logins_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_social_logins_provider_social_id
        UNIQUE (provider, social_id),
    INDEX idx_social_logins_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sensor_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_id BIGINT NOT NULL,
    temperature FLOAT,
    humidity FLOAT,
    light FLOAT,
    soil FLOAT,
    reg_date DATETIME(6),
    CONSTRAINT fk_sensor_data_plant FOREIGN KEY (plant_id)
        REFERENCES plants(id) ON DELETE CASCADE,
    INDEX idx_sensor_data_plant_reg_date (plant_id, reg_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ai_chat_rooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    plant_id BIGINT NOT NULL,
    title VARCHAR(255),
    created_at DATETIME(6),
    updated_at DATETIME(6),
    CONSTRAINT fk_ai_chat_rooms_user FOREIGN KEY (user_id)
        REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_ai_chat_rooms_plant FOREIGN KEY (plant_id)
        REFERENCES plants(id) ON DELETE CASCADE,
    INDEX idx_ai_chat_rooms_user_id (user_id),
    INDEX idx_ai_chat_rooms_plant_id (plant_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE ai_chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    room_id BIGINT,
    sender ENUM('USER', 'ASSISTANT'),
    content TEXT,
    created_at DATETIME(6),
    CONSTRAINT fk_ai_chat_messages_room FOREIGN KEY (room_id)
        REFERENCES ai_chat_rooms(id) ON DELETE CASCADE,
    INDEX idx_ai_chat_messages_room_id_id (room_id, id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE boards (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    writer VARCHAR(255) NOT NULL,
    views INT NOT NULL DEFAULT 0,
    created_at DATETIME(6) NOT NULL,
    updated_at DATETIME(6),
    INDEX idx_boards_category_created_at (category, created_at),
    INDEX idx_boards_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE board_images (
    board_id BIGINT NOT NULL,
    sort_order INT NOT NULL,
    image_url VARCHAR(500),
    PRIMARY KEY (board_id, sort_order),
    CONSTRAINT fk_board_images_board FOREIGN KEY (board_id)
        REFERENCES boards(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    board_id BIGINT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    writer VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME(6) NOT NULL,
    parent_id BIGINT,
    CONSTRAINT fk_comments_board FOREIGN KEY (board_id)
        REFERENCES boards(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_parent FOREIGN KEY (parent_id)
        REFERENCES comments(id) ON DELETE CASCADE,
    INDEX idx_comments_board_created_at (board_id, created_at),
    INDEX idx_comments_parent_id (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
