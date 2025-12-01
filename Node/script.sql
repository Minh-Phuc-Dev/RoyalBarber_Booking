CREATE TABLE users
(
    id           SERIAL PRIMARY KEY,
    email        VARCHAR(255) UNIQUE NOT NULL,
    password     VARCHAR(255)        NOT NULL,
    role         VARCHAR(50)         NOT NULL,
    display_name VARCHAR(100)        NOT NULL,
    status       VARCHAR(50)         NOT NULL DEFAULT 'ACTIVE',
    attributes   JSON                         DEFAULT '{}',
    meta         JSON                         DEFAULT '{}',
    created_at   TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP                    DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_otps
(
    id         SERIAL PRIMARY KEY,
    user_id    INTEGER     NOT NULL,
    otp_code   VARCHAR(10) NOT NULL,
    expires_at TIMESTAMP   NOT NULL,
    used       BOOLEAN     NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP            DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE services
(
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100)   NOT NULL,
    description VARCHAR(500),
    price       DECIMAL(10, 2) NOT NULL,
    image       VARCHAR(255)   NULL,
    duration    INTEGER        NOT NULL,
    category    VARCHAR(100)   NOT NULL,
    status      VARCHAR(50)    NOT NULL DEFAULT 'ACTIVE',
    attributes  JSON                    DEFAULT '{}',
    created_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP               DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promotions
(
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255)        NOT NULL,
    description VARCHAR(500),
    value       DECIMAL(10, 2)      NOT NULL,
    code        VARCHAR(100) UNIQUE NOT NULL,
    start_date  DATE                NOT NULL,
    end_date    DATE                NOT NULL,
    total       INTEGER             NOT NULL DEFAULT 100,
    usage       INTEGER             NOT NULL DEFAULT 0,
    status      VARCHAR(50)         NOT NULL,
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookings
(
    id             SERIAL PRIMARY KEY,
    code           VARCHAR(50) UNIQUE NULL,
    staff_id       INTEGER            NULL,
    customer_id    INTEGER            NULL,
    service_id     INTEGER            NOT NULL,
    date           DATE               NOT NULL,
    time           TIME               NOT NULL,
    status         VARCHAR(50)        NOT NULL,
    payment_method VARCHAR(50),
    price          DECIMAL(10, 2)     NOT NULL,
    meta           JSON,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP,
    promotion_id   INTEGER            NULL,
    FOREIGN KEY (staff_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (customer_id) REFERENCES users (id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services (id) ON DELETE SET NULL,
    FOREIGN KEY (promotion_id) REFERENCES promotions (id) ON DELETE SET NULL
);

CREATE TABLE transactions
(
    id               SERIAL PRIMARY KEY,
    booking_id       INTEGER        NOT NULL,
    amount           DECIMAL(10, 2) NOT NULL,
    provider         VARCHAR(100)   NOT NULL,
    status           VARCHAR(50)    NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    meta             JSON,
    FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE CASCADE
);
