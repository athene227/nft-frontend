import styled from "styled-components";

const TopCollection = styled.div`
.section-top-collection {
    &.container_bg {
        // background-image: url("./img/topsb-bg.png");
        background-image: ${({theme})=> theme.colors['top-collection-image']};
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: bottom center;
    }

    .seller_list {
        max-height: 420px;
        overflow-y: scroll;
        .seller_list_item {
            height: 70px;
            display: flex;
            align-items: center;
            position: relative;
            margin: 0.5rem 0;
            background: ${({theme})=> theme.colors['collection-item-bg']};
            border-radius: 8px;
            padding: 1rem;
            margin: 0.5rem;
            .seller-info {
                p {
                    color:${({theme})=> theme.colors['text-btn-light']};
                }
            }
        }

        &::-webkit-scrollbar {
            width: 3px;
        }

        &::-webkit-scrollbar-track {
            background: ${({theme})=> theme.colors['scrollbar-trackbg']};
        }

        &::-webkit-scrollbar-thumb {
            background: ${({theme})=> theme.colors['scrollbar-thumbbg']};
         
            border-radius: 10px;
        }

        &:hover::-webkit-scrollbar-thumb {
            background: #32bbf5;
        }   
    }


    .list {

        @media screen and (min-width: 495px) and (max-width: 991px) {
            .list__header__container * {
                font-size: 30px;
            }

            .list__content__item {
                padding: 0;
            }
        }
        @media screen and (max-width: 494px) {
            .list__header {
                gap: 1rem;

                &__container {
                    * {
                        font-size: 20px;
                    }

                    &__select svg {
                        right: 0.875rem;
                    }
                }
            }

            .list__content {
                grid-gap: 1.375rem;
                gap: 1.375rem;

                &__item {
                    padding: 0;

                    &__left {
                        &__number {
                            font-size: 1rem;
                        }

                        &__image {
                            width: 2.5rem;
                            height: 2.5rem;

                            svg {
                                width: 1.5rem;
                                height: 1.5rem;
                            }
                        }

                        &__info * {
                            font-size: 1rem;
                        }
                    }
                }
            }
        }

        display: flex;
        flex-direction: column;
        max-width: 34.375rem;
        width: 100%;
        &__header {
            display: flex;
            align-content: center;
            gap: 1.875rem;
            margin-bottom: 2.813rem;
            &__container {
                display: flex;
                align-items: center;
                font-weight: 900;
                font-size: 2.25rem;
                color: ${({theme})=> theme.colors['white']};
                p {
                    margin: 0;
                }
                &__select {
                    font-weight: 900 !important;
                    font-size: 2.25rem !important;
                    color: ${({theme})=> theme.colors['color_primary']}!important;
                    @media screen and (max-width: 1199px) {
                        font-size: 25px !important;
                    }
                    position: relative;
                    .MuiSelect-select {
                        padding-top: 0;
                        padding-bottom: 0;
                    }
                    .MuiOutlinedInput-notchedOutline {
                        border: none;
                    }
                    svg {
                        color: v${({theme})=> theme.colors['pink_col']};
                        font-size: 2rem;
                        right: 0;
                    }
                }
            }
        }
        &__content {
            display: flex;
            flex-direction: column;
            max-height: 31.25rem;
            gap: 2.375rem;
            overflow-y: auto;

            &::-webkit-scrollbar {
                width: 5px;
            }

            &::-webkit-scrollbar-track {
                background: ${({theme})=> theme.colors['black_lit']};
                border-radius: 5px;
            }

            &::-webkit-scrollbar-thumb {
                background: ${({theme})=> theme.colors['blue']};
                border-radius: 5px;

                &:hover {
                    background: ${({theme})=> theme.colors['blue']};
                }
            }

            &__item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1.25rem;
                padding: 1.25rem 0;
                &__left {
                    display: flex;
                    align-items: center;
                    &__number {
                        color: ${({theme})=> theme.colors['khaki']};
                        font-weight: 600;
                        font-size: 1.125rem;
                        margin: 0;
                    }
                    &__image {
                        width: 3.75rem;
                        height: 3.75rem;
                        border-radius: 50%;
                        margin-left: 0.938rem;
                        margin-right: 1.438rem;
                        position: relative;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center;
                            border-radius: 50%;
                            overflow: hidden;
                        }
                        svg {
                            position: absolute;
                            top: -0.438rem;
                            right: -0.375rem;
                            width: 2rem;
                            height: 2rem;
                        }
                    }
                    &__info {
                        &__name {
                            font-weight: 700;
                            font-size: 1.125rem;
                            color: ${({theme})=> theme.colors['white']};
                            margin: 0;
                            letter-spacing: -0.025em;
                        }
                        &__price {
                            font-weight: 400;
                            font-size: 1rem;
                            color: ${({theme})=> theme.colors['khaki']};
                            margin: 0;
                            letter-spacing: -0.025em;
                        }
                    }
                }
            }
        }
    }
    .useritem-index {
        font-size: 20px;
        text-align: right;
        // background-color:$white;
    }

    .author_list_pp {
        cursor: pointer;
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        background: ${({theme})=> theme.colors['color_primary']};
        margin-left: 25px;
        margin-top: -3px;
        border-radius: 100% !important;
        z-index: 1;
        transition: 0.3s;
        &:hover img {
            padding: 3px;
            -webkit-box-shadow: 0px 0px 0px 2px ${({theme})=> theme.colors['color_primary']};
            transition: 0.3s;
        }
    }

    .author_list_pp img {
        width: 100%;
        height: 100%;
        border-radius: 100% !important;
        -moz-border-radius: 100% !important;
        -webkit-border-radius: 100% !important;
        position: relative;
        z-index: 1;
    }

    .author_list_pp i {
        color: ${({theme})=> theme.colors['white']};
        background: ${({theme})=> theme.colors['color_primary']};
        font-size: 10px;
        padding: 3px;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 100%;
        -moz-border-radius: 100%;
        -webkit-border-radius: 100%;
        z-index: 2;
    }

    .author_list_info {
        font-weight: bold;
        padding-left: 70px;
        span {
            cursor: pointer;
            color: ${({theme})=> theme.colors['white']};
        }
        .bot {
            color: ${({theme})=> theme.colors['gray']};
            display: block;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.2em;
        }
    }

    .seller_info {
        padding-left: 5rem;

        .useritem-username {
            font-weight: bold;
            font-size: 18px;
            color: ${({theme})=> theme.colors['text-btn-light']};
        }
    }

    .useritem-percentage {
        color: #009e65;
        font-weight: 400;
    }

    .check_icon {
        width: 25px !important;
        height: 25px !important;
        position: absolute !important;
        right: -10%;
        top: -15%;
    }
}
.section-top-collection {
    /* @include theme("themeLight", background-image, none!important); */
    .style-2 {
        @media screen and (max-width:641px){
            text-align: center;
        }
        fieldset {
            /* @include theme("themeLight", border, 0px); */
        }
        @media screen and (max-width: 1199px) {
            font-size: 25px;
        }
    }

    /* .cseller_list_item {
        .themeLight & {
            background-color: $white;
            .cseller-info {
                p {
                    color: $text-btn-light;
                }
            }
        }
    } */
}
`;
export default TopCollection;
