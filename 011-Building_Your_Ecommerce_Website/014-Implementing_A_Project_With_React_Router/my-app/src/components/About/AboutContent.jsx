import React, { Fragment } from "react";
import FooterContent from "../Footer/FooterContent";


function AboutContent() {
    return (
        <Fragment>
            <h3 style={{ textAlign: "center", margin: "20px 0" }}>ABOUT</h3>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "20px" }}>
                <img
                    src="https://media.istockphoto.com/id/1806011581/photo/overjoyed-happy-young-people-dancing-jumping-and-singing-during-concert-of-favorite-group.jpg?s=2048x2048&w=is&k=20&c=PwxCBUPI8AK2ukQRtte2BPtJ1FpnhCpZL-xlF2YTfoM="
                    alt="Concert"
                    style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        marginRight: "20px"
                    }}
                />
                <p style={{ maxWidth: "600px", textAlign: "justify" }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet facilis culpa quas nostrum omnis.
                    Eaque nisi cumque eveniet saepe quidem consequuntur, aliquam repellat ex voluptatum temporibus!
                    Tempora, obcaecati maxime qui iure laboriosam non temporibus, dolorum commodi adipisci reiciendis porro.
                    Quae ab cum, iste veritatis fuga explicabo eaque neque sequi dolorem nisi voluptate nam et ipsum blanditiis
                    soluta officiis saepe rem. Dignissimos voluptate consequatur, tempore nam harum ab. Autem reiciendis repellendus
                    eaque magni vero ipsum. Nesciunt, qui obcaecati! Dolorem sequi alias maiores quam quidem in itaque ipsum repudiandae
                    voluptate ea similique et accusantium quibusdam quisquam rem aliquid dignissimos temporibus, laboriosam voluptas.
                </p>
            </div>

            <FooterContent />


        </Fragment>
    );
}

export default AboutContent;
